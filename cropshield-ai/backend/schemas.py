"""Data schemas and type definitions for CropShield AI."""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Wiki Schemas
# ---------------------------------------------------------------------------

class WikiFrontmatter(BaseModel):
    """YAML Frontmatter metadata from an Agriculture Wiki problem file."""
    crop: str = Field(..., description="Crop name, e.g. 'Rice'")
    problem: str = Field(..., description="Problem/disease name, e.g. 'Blast'")
    type: Optional[str] = Field(None, description="Category, e.g. 'fungal_disease', 'bacterial_disease', 'nutrient_deficiency'")
    status: Optional[str] = Field(None, description="Validation status, e.g. 'verified', 'structured_v2'")
    phenotype_schema_version: Optional[str] = Field(None, description="Schema version of phenotype notation")
    extra: Dict[str, Any] = Field(default_factory=dict, description="Additional custom metadata")


class ProblemSummary(BaseModel):
    """Concise representation of a problem in the Wiki."""
    crop: str
    problem: str
    relative_path: str
    type: Optional[str] = None
    status: Optional[str] = None


class CropInfo(BaseModel):
    """Summary of a crop entry in the Wiki."""
    crop: str
    problem_count: int
    problems: List[str]


class ProblemDetail(BaseModel):
    """Full detail of a Wiki problem entry including frontmatter and markdown."""
    frontmatter: WikiFrontmatter
    relative_path: str
    body: str
    sections: Dict[str, str] = Field(default_factory=dict)
    machine_notes: Dict[str, Any] = Field(default_factory=dict)


class ValidationIssue(BaseModel):
    """A specific issue discovered during Wiki validation."""
    file: str
    issue_type: str  # 'missing_frontmatter', 'missing_crop', 'missing_problem', 'malformed_yaml', 'missing_section', 'invalid_enum'
    message: str
    severity: str = "error"  # 'error' or 'warning'


class WikiValidationReport(BaseModel):
    """Comprehensive validation report for the entire Agriculture Wiki."""
    installed: bool
    status: str
    total_files_scanned: int = 0
    total_crops_scanned: int = 0
    issues: List[ValidationIssue] = Field(default_factory=list)
    valid_count: int = 0
    invalid_count: int = 0


# ---------------------------------------------------------------------------
# Environmental Context Schema
# ---------------------------------------------------------------------------

class EnvironmentalContext(BaseModel):
    """Runtime environmental / meteorological observations."""
    latitude: Optional[float] = Field(None, description="Latitude coordinate")
    longitude: Optional[float] = Field(None, description="Longitude coordinate")
    location_name: Optional[str] = Field(None, description="Location name, e.g. 'Maharashtra', 'Pune'")
    temperature_c: Optional[float] = Field(None, description="Current temperature in Celsius")
    relative_humidity_percent: Optional[float] = Field(None, description="Relative humidity %")
    rainfall_last_24h_mm: Optional[float] = Field(None, description="Rainfall in last 24 hours (mm)")
    rainfall_last_7_days_mm: Optional[float] = Field(None, description="Rainfall in last 7 days (mm)")
    leaf_wetness: Optional[str] = Field(None, description="'dry', 'possible', 'likely', 'prolonged'")
    season: Optional[str] = Field(None, description="e.g. 'kharif', 'rabi', 'zaid', 'wet_season', 'post_monsoon'")
    soil_condition: Optional[str] = Field(None, description="e.g. 'waterlogged', 'normal', 'dry'")
    additional_notes: Optional[str] = Field(None, description="Freeform climate context")
    source: Optional[str] = Field(None, description="Data source e.g. 'Agri Environment API', 'Open-Meteo'")


# ---------------------------------------------------------------------------
# Visual Botanical Phenotype Representation (Pass 1)
# ---------------------------------------------------------------------------

class PhenotypeExtraction(BaseModel):
    """Fine-grained botanical phenotype extracted from plant imagery."""
    is_plant: bool = Field(True, description="Whether image is a verified plant/leaf specimen")
    non_plant_reason: Optional[str] = Field(None, description="Reason if non-plant object/person detected")
    is_healthy: bool = Field(False, description="Whether leaf is healthy with no disease symptoms")
    plant_parts: List[str] = Field(default_factory=list, description="Affected plant parts: leaf_blade, leaf_sheath, panicle, collar, stem, etc.")
    symptom_class: Optional[str] = Field(None, description="discrete_lesion, linear_streak, continuous_blight, diffuse_discoloration, 3d_structure")
    lesion_presence: bool = Field(True, description="Whether discrete lesions are visible")
    lesion_size: Optional[str] = Field(None, description="Estimated size e.g. small spots, 1-3cm, large patches")
    
    # Critical geometry distinctions - DO NOT collapse spindle_diamond or linear_streak into generic elongated
    primary_shape: Optional[str] = Field(None, description="spindle_diamond, oval_circular, linear_streak, irregular_patch, etc.")
    elongation: Optional[str] = Field(None, description="none, low, moderate, high")
    width_profile: Optional[str] = Field(None, description="wider_center, approximately_uniform, wider_at_one_end, unclear")
    lesion_ends: Optional[str] = Field(None, description="pointed_tapered, rounded_blunt, irregular, unclear")
    
    # Colors and boundaries
    center_color: Optional[str] = Field(None, description="Pale gray, whitish, tan, etc.")
    margin_color: Optional[str] = Field(None, description="Reddish brown, dark brown, yellow halo, etc.")
    surrounding_color: Optional[str] = Field(None, description="Normal green, chlorotic, yellowing")
    color_transition: Optional[str] = Field(None, description="sharp_two_tone, gradual, uniform")
    
    # Texture and dynamics
    current_texture: Optional[str] = Field(None, description="dry_necrotic, water_soaked, powdery, papery")
    early_appearance: Optional[str] = Field(None, description="pinpoint_water_soaked, chlorotic_fleck, unclear")
    
    # Pattern and distribution
    orientation: Optional[str] = Field(None, description="longitudinal, transverse, unoriented")
    distribution: Optional[str] = Field(None, description="scattered, continuous, focal_cluster")
    coalescence: Optional[str] = Field(None, description="isolated, partial, extensive_coalescing")
    vein_relationship: Optional[str] = Field(None, description="confined_between_veins, expands_across_veins, not_vein_dependent")
    spatial_location: Optional[str] = Field(None, description="Primary location: leaf_blade, sheath_base, panicle_neck")
    whole_plant_features: List[str] = Field(default_factory=list, description="Stunting, wilting, lodging, tillering changes")
    visible_structures: List[str] = Field(default_factory=list, description="Fungal fruiting bodies, bacterial ooze, sclerotia, smut balls")
    uncertainty: List[str] = Field(default_factory=list, description="Ambiguous or obscured visual features")
    image_quality: Optional[str] = Field(None, description="clear, blur, glare, low_resolution, partial_view")
    raw_phenotype_text: Optional[str] = Field(None, description="Verbatim output from vision model")


# ---------------------------------------------------------------------------
# Diagnostic Response Schema (Pass 2)
# ---------------------------------------------------------------------------

class StrongestAlternative(BaseModel):
    name: str = Field(default="", description="Name of the strongest alternative candidate")
    reason_less_likely: str = Field(default="", description="Key contradictory features or exclusion triggers that made it less likely")


class CandidateComparisonResult(BaseModel):
    """Structured machine-readable output for an independent disease candidate comparison."""
    disease: str = Field(..., description="Candidate disease name")
    reference_image_used: bool = Field(default=False, description="True if a valid local reference image was evaluated")
    reference_image_path: Optional[str] = Field(default=None, description="Path to reference image if used")
    visual_match_score: Optional[float] = Field(default=None, description="Visual resemblance to reference image (0-100), null if no reference image")
    phenotype_match_score: float = Field(..., description="Correspondence of observed symptoms to structured phenotype (0-100)")
    overall_score: float = Field(..., description="Combined weighted score or phenotype score (0-100)")
    confidence: float = Field(..., description="Confidence in this candidate comparison (0.0 to 1.0)")
    matching_features: List[str] = Field(default_factory=list, description="Observed features supporting this disease")
    contradicting_features: List[str] = Field(default_factory=list, description="Contradictory or excluding features observed")
    observed_features: List[str] = Field(default_factory=list, description="Key features observed in the user image")
    missing_expected_features: List[str] = Field(default_factory=list, description="Expected symptoms absent in the user image")
    reasoning: str = Field(default="", description="Detailed comparative rationale")


class DiagnosisResponse(BaseModel):
    """Structured response validated before delivery to client."""
    crop: str = Field(..., description="Crop diagnosed")
    diagnosis: str = Field(..., description="Top diagnosis candidate name, e.g. 'Blast'")
    confidence: float = Field(..., description="Confidence score between 0.0 and 1.0")
    is_plant: bool = Field(default=True, description="Whether specimen is a verified plant/leaf")
    is_healthy: bool = Field(default=False, description="Whether specimen is healthy with no pathology")
    decisive_features: List[str] = Field(default_factory=list, description="Primary morphological features supporting this verdict")
    environmental_support: List[str] = Field(default_factory=list, description="Environmental conditions aligning with disease profile")
    strongest_alternative: StrongestAlternative = Field(default_factory=StrongestAlternative)
    uncertainty: List[str] = Field(default_factory=list, description="Remaining botanical or visual uncertainties")
    wiki_sources: List[str] = Field(default_factory=list, description="Path to Wiki references consulted")
    phenotype: Optional[PhenotypeExtraction] = Field(None, description="Pass 1 extracted botanical phenotype")
    elimination_log: Optional[str] = Field(None, description="Hierarchical elimination reasoning transcript")
    candidate_results: List[CandidateComparisonResult] = Field(default_factory=list, description="Preserved intermediate candidate comparison results")
    is_error: bool = Field(default=False, description="True if diagnosis failed due to API, network, or validation error")
    error_details: Optional[str] = Field(default=None, description="Exact error message and diagnostic details")


class DiagnosisRequest(BaseModel):
    """Incoming diagnosis request."""
    crop: str = Field(default="Rice", description="Crop name, e.g. 'Rice'")
    image: str = Field(..., description="Base64-encoded image string or image data URL")
    location: Optional[str] = Field(default="Maharashtra", description="Location name or preset")
    latitude: Optional[float] = Field(default=19.7515, description="Latitude")
    longitude: Optional[float] = Field(default=75.7139, description="Longitude")
    season: Optional[str] = Field(default=None, description="Selectable season for testing (e.g. kharif, rabi, zaid)")
    environmental_context: Optional[EnvironmentalContext] = None


# ---------------------------------------------------------------------------
# Sentinel-2 Farmland Stress Analysis Schemas
# ---------------------------------------------------------------------------

class SentinelPoint(BaseModel):
    lat: float = Field(..., description="Latitude coordinate")
    lng: float = Field(..., description="Longitude coordinate")


class SentinelAnalysisRequest(BaseModel):
    points: List[SentinelPoint] = Field(..., min_length=3, description="List of 3 or more GPS corner points defining the farmland")
    crop: Optional[str] = Field("General Crops", description="Crop name if specified")
    start_date: Optional[str] = Field(None, description="Start date in ISO format")
    end_date: Optional[str] = Field(None, description="End date in ISO format")


class UnhealthySpot(BaseModel):
    id: int
    lat: float
    lng: float
    area_sqm: float
    area_gunthas: float
    severity: str  # 'Severe', 'Moderate', 'Mild'
    mean_ndvi: float
    mean_ndre: float
    mean_evi: Optional[float] = 0.45
    mean_ndmi: Optional[float] = 0.28
    stress_score: float
    detected_issue: str
    actionable_recommendation: str


class SentinelAnalysisResponse(BaseModel):
    success: bool
    farm_area_sqm: float
    farm_area_acres: float
    farm_area_gunthas: float
    vegetation_coverage_percent: float
    mean_ndvi: float
    mean_ndre: float
    mean_evi: Optional[float] = 0.52
    mean_ndmi: Optional[float] = 0.34
    health_status: str  # 'Good', 'Moderate Stress', 'Severe Stress'
    unhealthy_spots_count: int
    unhealthy_spots: List[UnhealthySpot]
    ndvi_min: float
    ndvi_max: float
    heatmap_overlay_base64: Optional[str] = None
    heatmap_bounds: Optional[List[List[float]]] = None  # [[south, west], [north, east]]
    message: str
    data_source: Optional[str] = "Copernicus Sentinel-2 L2A (10m)"

