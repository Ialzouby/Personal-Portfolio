import { StaticImageData } from "next/image";
import blog1 from "@/../public/images/blog/blog1.gif";
import blog2 from "@/../public/images/blog/blog2.jpg";
import blog3 from "@/../public/images/blog/blog3.webp";

export interface PresentationSection {
    heading?: string;
    text?: string;
    bullets?: string[];
    image?: StaticImageData;
    quote?: {
        text: string;
        author: string;
    };
}

export interface Presentation {
    id: number;
    slug: string;
    title: string;
    description: string;
    date: string;
    time: string;
    tags: string[];
    img: StaticImageData; // Using blog images as placeholders
    slidesId: string; // Google Slides ID
    fileId?: string; // Optional: Original Google Drive File ID for automatic thumbnail generation
    overview?: string[]; // Bullet points for "What You'll Learn"
    prerequisites?: string[];
    keyConcepts?: { term: string; definition: string }[];
    toc?: string[];
    additionalResources?: { text: string; url: string }[];
    relatedPresentations?: number[]; // IDs of related presentations
}

export const presentations: Presentation[] = [

    {
        id: 4,
        slug: "ae-to-vqvae",
        title: "From Autoencoders to VQ-VAEs: A Mathematical Timeline",
        description: "A comprehensive timeline and deep dive into the mathematical concepts evolving from standard Autoencoders to VQ-VAEs. Covers the progression of generative models, focusing on the shift from continuous to discrete latent spaces.",
        date: "January 2026",
        time: "30 min read",
        tags: ["Generative Models", "Math Concepts", "Autoencoders", "VQ-VAE"],
        img: blog2, // Placeholder using an existing image
        slidesId: "2PACX-1vSHtfcVwFxz5EbTVGuDlyEp-Cn3rId_ZLU4jdUxohBQ3QJ8uWVLnIn9-G_Pp1ZIMg",
        overview: [
            "Evolution of Autoencoder architectures over time",
            "Mathematical foundations of Variational Inference",
            "The shift from continuous to discrete latent spaces",
            "Vector Quantization mechanics and codebook learning",
            "Addressing posterior collapse and training stability",
        ],
        keyConcepts: [
            { term: "Autoencoder", definition: "Neural network that learns efficient data codings in an unsupervised manner" },
            { term: "Variational Inference", definition: "Method to approximate complex distributions in latent variable models" },
            { term: "Vector Quantization", definition: "Technique to map continuous vectors to a finite set of codebook vectors" },
            { term: "Codebook Collapse", definition: "Training failure where only a subset of embedding vectors is used" },
        ],
        toc: [
            "Introduction to Autoencoders (Slides 1-8)",
            "The Probabilistic Turn: VAEs (Slides 9-18)",
            "Discretization & VQ-VAE (Slides 19-28)",
            "Mathematical Constraints & Loss Functions (Slides 29-38)",
            "Future Directions (Slides 39-44)",
        ],
        additionalResources: [
            { text: "Neural Discrete Representation Learning (Oord et al.)", url: "https://arxiv.org/abs/1711.00937" },
            { text: "Understanding VAEs (Blog)", url: "https://arxiv.org/abs/1312.6114" },
        ],
    },
    {
        id: 5,
        slug: "training-bamm",
        title: "Training BAMM - Bidirectional Autoregressive Motion Model",
        description: "A step-by-step walkthrough of the BAMM pipeline, covering motion data collection, training the VQ-VAE for discrete representation, and training the Bidirectional Autoregressive Transformer (BAR) for motion generation.",
        date: "January 2026",
        time: "25 min read",
        tags: ["Generative Models", "Motion Models", "Transformers", "BAMM"],
        img: blog3, // Placeholder
        slidesId: "2PACX-1vQF9NtAXn39r5jIuleV3M8ct74wVAJofO8k6j2znNwrkIZNm3H1Fxhj9zZ0UzHF5g",
        overview: [
            "Motion Capture data processing and cleaning",
            "VQ-VAE architecture for human motion",
            "Residual Transformer training",
            "Bidirectional Autoregressive modeling explained",
            "Evaluating generation quality",
        ],
        keyConcepts: [
            { term: "Motion VQ-VAE", definition: "Compressing high-dimensional motion sequences into discrete codebook tokens" },
            { term: "Residual Transformer", definition: "Refines motion generation by predicting residual errors" },
            { term: "Bidirectional Autoregressive", definition: "Model that generates sequences considering both past and future context" },
        ],
        toc: [
            "Data Methodology (Slides 1-8)",
            "VQ-VAE Implementation (Slides 9-18)",
            "Transformer Architecture (Slides 19-28)",
            "Training Pipeline (Slides 29-35)",
            "Results (Slides 36-40)",
        ],
        additionalResources: [
            { text: "BAMM Project Page", url: "#" },
        ],
    },
    {
        id: 6,
        slug: "momask-presentation",
        title: "MoMask: Generative Masked Modeling of 3D Human Motions",
        description: "An in-depth look at MoMask, a framework for 3D human motion generation using masked modeling. Covers Architecture, Residual VQ-VAE, Masked Transformer training, and Inference.",
        date: "January 2026",
        time: "25 min read",
        tags: ["Generative Models", "Motion Models", "Transformers", "MoMask", "3D Vision"],
        img: blog1, // Placeholder
        slidesId: "2PACX-1vQAO_YQ7EY5fK-yyIkIXdDEA23rxgiRrEqd4LPvsh9t1O7Zp1tcKBhJ8rnkB3k-Qw",
        overview: [
            "Architecture Overview of MoMask",
            "Training the Residual VQ-VAE",
            "Masked Transformer Modeling",
            "Inference Pipeline & Sampling",
            "Quantitative & Qualitative Results",
        ],
        keyConcepts: [
            { term: "Masked Modeling", definition: "Learning to reconstruct corrupted motion sequences token by token." },
            { term: "Residual VQ-VAE", definition: "A hierarchical VQ-VAE that learns coarse-to-fine discrete representations." },
            { term: "Motion Editing", definition: "Capabilities allowed by masked modeling like in-painting and motion interpolation." },
        ],
        toc: [
            "Architecture Overview (Slides 1-5)",
            "Residual VQ-VAE & Training (Slides 6-12)",
            "Masked & Residual Transformer (Slides 13-20)",
            "Inference Pipeline (Slides 21-25)",
            "Results & Future Work (Slides 26-end)",
        ],
        additionalResources: [
            { text: "MoMask Paper", url: "https://arxiv.org/abs/2312.00063" },
            { text: "Project Code", url: "https://github.com/ericguo5513/momask-codes" },
        ],
    },
    {
        id: 7,
        slug: "bamm-architecture",
        title: "BAMM: Human Motion Modeling & Architecture",
        description: "Deep dive into BAMM's architecture versus current T2M challenges. Details the Motion Tokenizer, Masked Self-Attention Transformer, Hybrid Attention Masking, and Cascaded Motion Decoding.",
        date: "January 2026",
        time: "25 min read",
        tags: ["Generative Models", "Motion Models", "Transformers", "BAMM"],
        img: blog2, // Placeholder
        slidesId: "2PACX-1vTmVm0qar5UkrG9XU2bb9gSEjtY2573WotSyoG4p2hlYq-F5NP7AfHqvIwlrq8Qog",
        overview: [
            "The Challenge of Current Text-to-Motion Models",
            "BAMM Architecture: Motion Tokenizer & Masked SA Transformer",
            "Training with Hybrid Attention Masking",
            "Inference using Cascaded Motion Decoding",
            "Classifier-Free Guidance (CFG)",
        ],
        keyConcepts: [
            { term: "Hybrid Attention Masking", definition: "Strategy combining masking patterns for robust training." },
            { term: "Cascaded Motion Decoding", definition: "Iterative decoding process for finer motion control." },
            { term: "Motion Tokenizer", definition: "Discretizing continuous motion data." },
        ],
        toc: [
            "Challenges & Architecture (Slides 1-10)",
            "Training Methodologies (Slides 11-20)",
            "Inference & Guidance (Slides 21-28)",
            "Evaluation & Results (Slides 29-end)",
        ],
        additionalResources: [
            { text: "BAMM Project Page", url: "https://github.com/Mathux/BAMM" },
        ],
    },
    {
        id: 8,
        slug: "diffusion-transformers-rae",
        title: "Diffusion Transformers with Representation Autoencoders",
        description: "Exploring the replacement of standard VAEs with pretrained representation encoders (DINO, SigLIP, MAE) to form Representation Autoencoders (RAEs). Analyzes challenges in high-dimensional latent spaces and achieves state-of-the-art ImageNet results.",
        date: "January 2026",
        time: "25 min read",
        tags: ["Generative Models", "Diffusion Models", "Transformers", "Representation Learning"],
        img: blog1, // Placeholder
        slidesId: "2PACX-1vQDdN9GwVvAjQ_wAqW39tLETGjZqKOKsjcAdOON9AAWXBLE2vrUQL4J4RreMVsxO-VU67-eZxW5orWK",
        overview: [
            "Limitations of standard VAE encoders (outdated backbones, low-dim latents)",
            "Introduction to Representation Autoencoders (RAEs)",
            "Challenges of operating in high-dimensional latent spaces",
            "Theoretical solutions for faster convergence",
            "ImageNet generation results (1.51 FID)",
        ],
        keyConcepts: [
            { term: "Representation Autoencoder (RAE)", definition: "Pairing pretrained encoders (DINO, SigLIP) with trained decoders." },
            { term: "High-Dimensional Latents", definition: "Semantically rich representations that challenge standard diffusion." },
            { term: "Diffusion Transformer (DiT)", definition: "The backbone architecture scaled for these experiments." },
        ],
        toc: [
            "Motivation & VAE Limitations (Slides 1-5)",
            "RAE Architecture Definition (Slides 6-12)",
            "Latent Space Analysis (Slides 13-20)",
            "Experimental Results (Slides 21-end)",
        ],
        additionalResources: [
            { text: "Paper: Diffusion Transformers with Representation Autoencoders", url: "#" },
        ],
    },
    {
        id: 9,
        slug: "human-motion-generation-models",
        title: "Introduction to Human Motion Generation Models",
        description: "A foundational overview of human motion modeling, covering 3D parametric body models (SMPL), motion datasets (AMASS, HumanML3D), and current approaches including absolute vs. global data representations.",
        date: "January 2026",
        time: "30 min read",
        tags: ["Human Motion", "Generative Models", "SMPL", "AI/ML"],
        img: blog3,
        slidesId: "2PACX-1vRAwtR-cMICmfXC2TFq_G0MPqhKzEYpFaNKQ9vvXW18O19fqvOP1fhUKAXEfd3Thw",
        overview: [
            "What is Human Motion Modeling?",
            "Understanding SMPL Skeletons",
            "Datasets & Motion Representations",
            "Current Models & Approaches",
            "AMASS vs HumanML3D Datasets",
            "Data Representations: 263 vs 277 dimensions"
        ],
        keyConcepts: [
            { term: "SMPL", definition: "Skinned Multi-Person Linear model - a realistic 3D human body model." },
            { term: "HumanML3D", definition: "A large-scale 3D human motion-language dataset." },
            { term: "AMASS", definition: "Archive of Motion Capture as Surface Shapes." },
        ],
        toc: [
            "Introduction to Motion Modeling",
            "Parametric Body Models (SMPL)",
            "Datasets & Representations",
            "Current Approaches",
        ],
        additionalResources: [],
    },
    {
        id: 10,
        slug: "index-backpropagation-quantization",
        title: "Index Backpropagation Quantization",
        description: "An analysis of resolving traditional codebook learning limitations using Index Backpropagation Quantization (IBQ). Covers the backpropagation trick and specific loss function differentiations compared to standard VQ.",
        date: "January 2026",
        time: "20 min read",
        tags: ["Quantization", "Deep Learning", "VQ-VAE", "Optimization"],
        img: blog2, // Placeholder
        slidesId: "2PACX-1vRzX-vKGW5V_7sdLU-GT8C8vI9_xcssUHR1vb2ELBkzZ5CbZ9Q3z0yCGK5W4JRD6A",
        overview: [
            "Limitations of traditional Codebook Learning",
            "Introduction to Index Backpropagation Quantization",
            "The Backpropagation Trick explained",
            "Loss Function comparison: Standard vs IBQ",
            "Gradient flow improvements"
        ],
        keyConcepts: [
            { term: "Codebook Collapse", definition: "A common failure mode in VQ-VAEs addressed by improved quantization methods." },
            { term: "Straight-Through Estimator", definition: "Traditional method for bypassing non-differentiable quantization steps." },
            { term: "Index Backpropagation", definition: "Optimizing indices directly via relaxed constraints or specific tricks." },
        ],
        toc: [
            "Problem: Codebook Learning Issues",
            "Solution: Index Backpropagation",
            "Mathematical Formulation",
            "Loss Functions & Results"
        ],
        additionalResources: [],
    },
    {
        id: 11,
        slug: "taming-teacher-forcing-video-generation",
        title: "Taming Teacher Forcing for Masked Autoregressive Video Generation",
        description: "An exploration of Masked Autoregressive Video Generation, focusing on the MAGI framework. Covers the shift from Masked Teacher Forcing (MTF) to Complete Teacher Forcing (CTF) to resolve training-inference mismatch, along with dynamic training strategies.",
        date: "February 2026",
        time: "20 min read",
        tags: ["Video Generation", "Masked Modeling", "Transformer", "Teacher Forcing"],
        img: blog2, // Placeholder
        slidesId: "2PACX-1vTlsnwlsr47r3Nk1s22GTl8T0cmZf2_bCPTT7qMd2HIYlNvK2godi47MoyYeaZthQnSpqJ5pGfKzMa6",
        overview: [
            "Video Generation Categories: Masked vs Fully Autoregressive",
            "The 'Training-Inference Mismatch' problem with Teacher Forcing",
            "MAGI's solution: Complete Teacher Forcing (CTF)",
            "Hybrid Transformer Backbone (Spatial + Temporal attention)",
            "Stabilization tricks: Dynamic Interval Training & Noise Injection",
        ],
        keyConcepts: [
            { term: "Masked Teacher Forcing (MTF)", definition: "Conditioning on ground-truth past frames during training, causing mismatch at inference." },
            { term: "Complete Teacher Forcing (CTF)", definition: "Conditioning on unmasked observed frames to mimic inference conditions." },
            { term: "Dynamic Interval Training", definition: "Randomly sampling frame intervals to handle varying motion speeds." },
            { term: "Dynamic Noise Injection", definition: "Adding noise to observation frames to improve robustness against prediction errors." },
        ],
        toc: [
            "Video Generation Landscape",
            "The Core Issue: Autoregression & Teacher Forcing",
            "MAGI & CTF Approach",
            "Architecture & Stabilization Tricks",
        ],
        additionalResources: [],
    },
    {
        id: 12,
        slug: "rectified-flow",
        title: "Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow",
        description: "An overview of Rectified Flow, learning a simpler, direct transport between distributions. Outperforms fast diffusion methods and conceptually simpler, achieving both high quality and fast inference.",
        date: "March 2026",
        time: "20 min read",
        tags: ["Generative Models", "Rectified Flow", "Domain Transfer", "ODE"],
        img: blog1, // Placeholder
        slidesId: "2PACX-1vR__-cCaBCrvaidXZkhFnzDfw1cZ6bDUzqzSLssZQD0YJf25aZRVFopmAldtDOxNWDToZwDVIrNeclK",
        overview: [
            "Balancing sample quality vs inference speed",
            "Limitations of Diffusion, CNFs & GANs",
            "Rectified flow and path rewiring",
            "PF-ODE categories: VP, sub-VP, VE",
            "Learning ODEs with direct smooth interpolation",
            "Unifying generative modeling and domain transfer",
        ],
        keyConcepts: [
            { term: "Transfer Mapping", definition: "Learning a mapping from a simple distribution (noise) to complex data (images, motion)." },
            { term: "Rectified Flow", definition: "Redirects paths that would intersect by rewiring, preserving both map density and causality." },
            { term: "Reflow", definition: "Decreases transport cost and straightens path which reduces calculation steps and time-error." },
        ],
        toc: [
            "The Problem: Modeling High-Dimensional Distributions",
            "Rectified Flow Mechanism",
            "PF-ODEs Analysis",
            "Direct ODE Learning & Interpolation",
            "Results & Key Advantages",
        ],
        additionalResources: [],
    },
    {
        id: 13,
        slug: "soft-masked-diffusion",
        title: "Soft-Masked Diffusion Language Models",
        description: "Continuous feedback MDLM utilizing soft masking to enrich mask tokens with weighted top-k prediction tokens, maintaining the benefits of masking while retaining more prediction information.",
        date: "March 2026",
        time: "20 min read",
        tags: ["Language Models", "Diffusion", "Masked Modeling", "NLP"],
        img: blog2, // Placeholder
        slidesId: "2PACX-1vRSmYW2bJUCiBY7vbf7iCNcbIYTq2QQDoFgDM9PokI-tlWZkDemUF2MknN3ZU7JoouYeGfBEPE3kNI3",
        overview: [
            "Autoregression of LLMs struggle with high computational cost.",
            "Diffusion provides LLMs with speed, self-correction, and bidirectional modeling.",
            "Masked diffusion offers benefits, but binary masking sacrifices prediction information.",
            "Continuous feedback MDLM proposes soft masking.",
            "Soft mask consistently outperforms binary mask in MAUVE scores.",
            "Performance gains are task and compute budget dependent."
        ],
        keyConcepts: [
            { term: "Soft Masking", definition: "Enriches mask tokens with weighted top-k prediction tokens instead of a binary selection." },
            { term: "Masked Diffusion Language Models (MDLM)", definition: "Applies diffusion models to language with masking, unlocking bidirectional modeling over autoregression." },
            { term: "MAUVE Score", definition: "A metric for evaluating open-ended text generation quality where soft masking consistently outperformed binary masks." },
        ],
        toc: [
            "Issues with Autoregression & Binary Masking",
            "Introduction to Soft-Masked Diffusion",
            "Optimal Hyperparameters & Tradeoffs (80% mask ratio, k=3)",
            "Results & Compute Impact",
            "Limitations at Scale & Future directions",
        ],
        additionalResources: [],
    },
];
