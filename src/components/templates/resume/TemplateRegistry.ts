import React from 'react';

// ================= IMPORT ALL TEMPLATES =================

// Fresher
import BankPOFormatTemplate from './layouts/fresher/BankPOFormatTemplate';
import CampusFlowTemplate from './layouts/fresher/CampusFlowTemplate';
import ClearStartTemplate from './layouts/fresher/ClearStartTemplate';
import SarkariStandardTemplate from './layouts/fresher/SarkariStandardTemplate';
import SkillLadderTemplate from './layouts/fresher/SkillLadderTemplate';
import StepOneGridTemplate from './layouts/fresher/StepOneGridTemplate';

// Tech
import AtlasDevTemplate from './layouts/tech/AtlasDevTemplate';
import MonoGridTemplate from './layouts/tech/MonoGridTemplate';
import VerticalPulseTemplate from './layouts/tech/VerticalPulseTemplate';
import VerticalTimelinePro from './layouts/tech/VerticalTimelinePro';
import StartupImpactGridTemplate from './layouts/tech/StartupImpactGridTemplate';

// Professional
import AxisLedgerTemplate from './layouts/professional/AxisLedgerTemplate';
import BoardroomGridTemplate from './layouts/professional/BoardroomGridTemplate';
import ConsultGridMatrixTemplate from './layouts/professional/ConsultGridMatrixTemplate';
import CorporateSplitLineTemplate from './layouts/professional/CorporateSplitLineTemplate';
import FounderMinimalTemplate from './layouts/professional/FounderMinimalTemplate';
import GridlineProTemplate from './layouts/professional/GridlineProTemplate';
import SplitConfidenceTemplate from './layouts/professional/SplitConfidenceTemplate';
import StrataProTemplate from './layouts/professional/StrataProTemplate';
import StrategyClassicEliteTemplate from './layouts/professional/StrategyClassicEliteTemplate';
import VerticalAccentProTemplate from './layouts/professional/VerticalAccentProTemplate';

// Creative
import AsymmetricFocusTemplate from './layouts/creative/AsymmetricFocusTemplate';
import AuroraCanvasTemplate from './layouts/creative/AuroraCanvasTemplate';
import CanvasFlowTemplate from './layouts/creative/CanvasFlowTemplate';
import DynamicTimelineFlow from './layouts/creative/DynamicTimelineFlow';
import EditorialSerifTemplate from './layouts/creative/EditorialSerifTemplate';
import FloatingCardsTemplate from './layouts/creative/FloatingCardsTemplate';
import PortfolioEdgeSidebar from './layouts/creative/PortfolioEdgeSidebar';
import SpectrumSidebandTemplate from './layouts/creative/SpectrumSidebandTemplate';
import SplitBannerImpact from './layouts/creative/SplitBannerImpact';
import SplitHighlightTemplate from './layouts/creative/SplitHighlightTemplate';
import SplitVerticalIdentityTemplate from './layouts/creative/SplitVerticalIdentityTemplate';
import TopBannerPortfolioTemplate from './layouts/creative/TopBannerPortfolioTemplate';

// Executive
import AuthoritySerifTemplate from './layouts/executive/AuthoritySerifTemplate';
import CenteredAuthorityLine from './layouts/executive/CenteredAuthorityLine';
import GlobalExecutiveLuxe from './layouts/executive/GlobalExecutiveLuxe';
import MinimalAuthorityTemplate from './layouts/executive/MinimalAuthorityTemplate';
import MinimalFrameBorderTemplate from './layouts/executive/MinimalFrameBorderTemplate';

// Modern
import BlockSectionModern from './layouts/modern/BlockSectionModern';
import BoldHorizonTemplate from './layouts/modern/BoldHorizonTemplate';
import CenterColumnEditorialTemplate from './layouts/modern/CenterColumnEditorialTemplate';
import CenterTimelineAxisTemplate from './layouts/modern/CenterTimelineAxisTemplate';
import MatrixMinimalGrid from './layouts/modern/MatrixMinimalGrid';
import NeoSplitTemplate from './layouts/modern/NeoSplitTemplate';
import NordicEdgeTemplate from './layouts/modern/NordicEdgeTemplate';
import SplitHeaderEdge from './layouts/modern/SplitHeaderEdge';
import TwoBandModernTemplate from './layouts/modern/TwoBandModernTemplate';
import VerticalTimelineTemplate from './layouts/modern/VerticalTimelineTemplate';
import SwissGridTemplate from './layouts/modern/SwissGridTemplate';

// ================= REGISTRY =================

const REGISTRY: Record<string, React.FC<any>> = {
    BankPOFormatTemplate,
    CampusFlowTemplate,
    ClearStartTemplate,
    SarkariStandardTemplate,
    SkillLadderTemplate,
    StepOneGridTemplate,
    AtlasDevTemplate,
    MonoGridTemplate,
    VerticalPulseTemplate,
    VerticalTimelinePro,
    StartupImpactGridTemplate,
    AxisLedgerTemplate,
    BoardroomGridTemplate,
    ConsultGridMatrixTemplate,
    CorporateSplitLineTemplate,
    FounderMinimalTemplate,
    GridlineProTemplate,
    SplitConfidenceTemplate,
    StrataProTemplate,
    StrategyClassicEliteTemplate,
    VerticalAccentProTemplate,
    AsymmetricFocusTemplate,
    AuroraCanvasTemplate,
    CanvasFlowTemplate,
    DynamicTimelineFlow,
    EditorialSerifTemplate,
    FloatingCardsTemplate,
    PortfolioEdgeSidebar,
    SpectrumSidebandTemplate,
    SplitBannerImpact,
    SplitHighlightTemplate,
    SplitVerticalIdentityTemplate,
    TopBannerPortfolioTemplate,
    AuthoritySerifTemplate,
    CenteredAuthorityLine,
    GlobalExecutiveLuxe,
    MinimalAuthorityTemplate,
    MinimalFrameBorderTemplate,
    BlockSectionModern,
    BoldHorizonTemplate,
    CenterColumnEditorialTemplate,
    CenterTimelineAxisTemplate,
    MatrixMinimalGrid,
    NeoSplitTemplate,
    NordicEdgeTemplate,
    SplitHeaderEdge,
    TwoBandModernTemplate,
    VerticalTimelineTemplate,
    SwissGridTemplate,
};

export const getTemplateComponent = (id: string): React.FC<any> => {
    const Component = REGISTRY[id];

    if (!Component) {
        console.warn(`Template "${id}" not found. Falling back.`);
        return REGISTRY['BankPOFormatTemplate']; // default safe template
    }

    return Component;
};


// ================= TEMPLATE METADATA =================

export const TEMPLATES = [

    // ================= FRESHER =================
    { id: 'BankPOFormatTemplate', name: 'Bank PO Format', category: 'fresher', layout: 'single', defaultFont: 'Inter', defaultColor: '#1e3a8a', isPremium: false },
    { id: 'CampusFlowTemplate', name: 'Campus Flow', category: 'fresher', layout: 'single', defaultFont: 'Poppins', defaultColor: '#2563eb', isPremium: false },
    { id: 'ClearStartTemplate', name: 'Clear Start', category: 'fresher', layout: 'single', defaultFont: 'Roboto', defaultColor: '#0f172a', isPremium: false },
    { id: 'SarkariStandardTemplate', name: 'Sarkari Standard', category: 'fresher', layout: 'single', defaultFont: 'Merriweather', defaultColor: '#000000', isPremium: false },
    { id: 'SkillLadderTemplate', name: 'Skill Ladder', category: 'fresher', layout: 'single', defaultFont: 'Lato', defaultColor: '#475569', isPremium: false },
    { id: 'StepOneGridTemplate', name: 'Step One Grid', category: 'fresher', layout: 'grid', defaultFont: 'Open Sans', defaultColor: '#334155', isPremium: false },

    // ================= TECH =================
    { id: 'AtlasDevTemplate', name: 'Atlas Dev', category: 'tech', layout: 'modern', defaultFont: 'Fira Code', defaultColor: '#0f766e', isPremium: false },
    { id: 'MonoGridTemplate', name: 'Mono Grid', category: 'tech', layout: 'grid', defaultFont: 'Source Code Pro', defaultColor: '#1e293b', isPremium: false },
    { id: 'VerticalPulseTemplate', name: 'Vertical Pulse', category: 'tech', layout: 'sidebar', defaultFont: 'Inter', defaultColor: '#7c3aed', isPremium: false },
    { id: 'VerticalTimelinePro', name: 'Vertical Timeline Pro', category: 'tech', layout: 'timeline', defaultFont: 'JetBrains Mono', defaultColor: '#0ea5e9', isPremium: true },
    { id: 'StartupImpactGridTemplate', name: 'Startup Impact', category: 'tech', layout: 'grid', defaultFont: 'Montserrat', defaultColor: '#f97316', isPremium: true },

    // ================= PROFESSIONAL =================
    { id: 'AxisLedgerTemplate', name: 'Axis Ledger', category: 'professional', layout: 'single', defaultFont: 'Georgia', defaultColor: '#1e40af', isPremium: false },
    { id: 'BoardroomGridTemplate', name: 'Boardroom Grid', category: 'professional', layout: 'grid', defaultFont: 'Garamond', defaultColor: '#111827', isPremium: false },
    { id: 'ConsultGridMatrixTemplate', name: 'Consult Matrix', category: 'professional', layout: 'grid', defaultFont: 'Inter', defaultColor: '#334155', isPremium: false },
    { id: 'CorporateSplitLineTemplate', name: 'Corporate Split', category: 'professional', layout: 'split', defaultFont: 'Times New Roman', defaultColor: '#0f172a', isPremium: false },
    { id: 'FounderMinimalTemplate', name: 'Founder Minimal', category: 'professional', layout: 'minimal', defaultFont: 'Lora', defaultColor: '#000000', isPremium: false },
    { id: 'GridlineProTemplate', name: 'Gridline Pro', category: 'professional', layout: 'grid', defaultFont: 'Calibri', defaultColor: '#1e293b', isPremium: false },
    { id: 'SplitConfidenceTemplate', name: 'Split Confidence', category: 'professional', layout: 'split', defaultFont: 'Roboto Slab', defaultColor: '#0f766e', isPremium: false },
    { id: 'StrataProTemplate', name: 'Strata Pro', category: 'professional', layout: 'modern', defaultFont: 'Helvetica', defaultColor: '#4b5563', isPremium: true },
    { id: 'StrategyClassicEliteTemplate', name: 'Strategy Elite', category: 'professional', layout: 'classic', defaultFont: 'Baskerville', defaultColor: '#1e3a8a', isPremium: true },
    { id: 'VerticalAccentProTemplate', name: 'Vertical Accent Pro', category: 'professional', layout: 'sidebar', defaultFont: 'Arial', defaultColor: '#6366f1', isPremium: false },

    // ================= CREATIVE =================
    { id: 'AsymmetricFocusTemplate', name: 'Asymmetric Focus', category: 'creative', layout: 'modern', defaultFont: 'Poppins', defaultColor: '#ec4899', isPremium: true },
    { id: 'AuroraCanvasTemplate', name: 'Aurora Canvas', category: 'creative', layout: 'creative', defaultFont: 'Quicksand', defaultColor: '#8b5cf6', isPremium: true },
    { id: 'CanvasFlowTemplate', name: 'Canvas Flow', category: 'creative', layout: 'modern', defaultFont: 'Montserrat', defaultColor: '#ea580c', isPremium: false },
    { id: 'DynamicTimelineFlow', name: 'Dynamic Timeline', category: 'creative', layout: 'timeline', defaultFont: 'Oswald', defaultColor: '#db2777', isPremium: true },
    { id: 'EditorialSerifTemplate', name: 'Editorial Serif', category: 'creative', layout: 'classic', defaultFont: 'Playfair Display', defaultColor: '#111827', isPremium: true },
    { id: 'FloatingCardsTemplate', name: 'Floating Cards', category: 'creative', layout: 'modern', defaultFont: 'DM Sans', defaultColor: '#6366f1', isPremium: false },
    { id: 'PortfolioEdgeSidebar', name: 'Portfolio Edge', category: 'creative', layout: 'sidebar', defaultFont: 'Work Sans', defaultColor: '#14b8a6', isPremium: true },
    { id: 'SpectrumSidebandTemplate', name: 'Spectrum Sideband', category: 'creative', layout: 'split', defaultFont: 'Comfortaa', defaultColor: '#f97316', isPremium: false },
    { id: 'SplitBannerImpact', name: 'Split Banner Impact', category: 'creative', layout: 'split', defaultFont: 'Raleway', defaultColor: '#3b82f6', isPremium: false },
    { id: 'SplitHighlightTemplate', name: 'Split Highlight', category: 'creative', layout: 'split', defaultFont: 'Ubuntu', defaultColor: '#be185d', isPremium: false },
    { id: 'SplitVerticalIdentityTemplate', name: 'Split Identity', category: 'creative', layout: 'sidebar', defaultFont: 'Didot', defaultColor: '#000000', isPremium: true },
    { id: 'TopBannerPortfolioTemplate', name: 'Top Banner Portfolio', category: 'creative', layout: 'modern', defaultFont: 'Abril Fatface', defaultColor: '#4c1d95', isPremium: true },

    // ================= EXECUTIVE =================
    { id: 'AuthoritySerifTemplate', name: 'Authority Serif', category: 'executive', layout: 'classic', defaultFont: 'Bodoni Moda', defaultColor: '#111827', isPremium: true },
    { id: 'CenteredAuthorityLine', name: 'Centered Authority', category: 'executive', layout: 'single', defaultFont: 'Georgia', defaultColor: '#000000', isPremium: false },
    { id: 'GlobalExecutiveLuxe', name: 'Global Executive Luxe', category: 'executive', layout: 'classic', defaultFont: 'Playfair Display', defaultColor: '#111111', isPremium: true },
    { id: 'MinimalAuthorityTemplate', name: 'Minimal Authority', category: 'executive', layout: 'minimal', defaultFont: 'Garamond', defaultColor: '#1e3a8a', isPremium: false },
    { id: 'MinimalFrameBorderTemplate', name: 'Minimal Frame Border', category: 'executive', layout: 'minimal', defaultFont: 'Times New Roman', defaultColor: '#000000', isPremium: false },

    // ================= MODERN =================
    { id: 'BlockSectionModern', name: 'Block Section Modern', category: 'modern', layout: 'modern', defaultFont: 'Inter', defaultColor: '#0ea5e9', isPremium: false },
    { id: 'BoldHorizonTemplate', name: 'Bold Horizon', category: 'modern', layout: 'modern', defaultFont: 'Oswald', defaultColor: '#f97316', isPremium: true },
    { id: 'CenterColumnEditorialTemplate', name: 'Center Column Editorial', category: 'modern', layout: 'single', defaultFont: 'Merriweather', defaultColor: '#0f172a', isPremium: false },
    { id: 'CenterTimelineAxisTemplate', name: 'Center Timeline Axis', category: 'modern', layout: 'timeline', defaultFont: 'Raleway', defaultColor: '#6366f1', isPremium: false },
    { id: 'MatrixMinimalGrid', name: 'Matrix Minimal Grid', category: 'modern', layout: 'grid', defaultFont: 'Roboto', defaultColor: '#334155', isPremium: false },
    { id: 'NeoSplitTemplate', name: 'Neo Split', category: 'modern', layout: 'split', defaultFont: 'Montserrat', defaultColor: '#8b5cf6', isPremium: false },
    { id: 'NordicEdgeTemplate', name: 'Nordic Edge', category: 'modern', layout: 'modern', defaultFont: 'Nunito', defaultColor: '#0f766e', isPremium: false },
    { id: 'SplitHeaderEdge', name: 'Split Header Edge', category: 'modern', layout: 'split', defaultFont: 'Lato', defaultColor: '#111827', isPremium: false },
    { id: 'TwoBandModernTemplate', name: 'Two Band Modern', category: 'modern', layout: 'modern', defaultFont: 'Helvetica', defaultColor: '#1e293b', isPremium: false },
    { id: 'VerticalTimelineTemplate', name: 'Vertical Timeline', category: 'modern', layout: 'timeline', defaultFont: 'Ubuntu', defaultColor: '#be185d', isPremium: false },
    { id: 'SwissGridTemplate', name: 'Swiss Grid', category: 'modern', layout: 'grid', defaultFont: 'Inter', defaultColor: '#000000', isPremium: true }

];


export const PREMIUM_TEMPLATES = new Set(
    TEMPLATES.filter(t => t.isPremium).map(t => t.id)
);
