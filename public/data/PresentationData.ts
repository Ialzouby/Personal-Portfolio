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
];
