// features img
import project1 from "@/../public/images/projects/project1.png";
import project2 from "@/../public/images/projects/project2.png";
import project3 from "@/../public/images/projects/project3.png";
import project4 from "@/../public/images/projects/project4.png";
import project5 from "@/../public/images/projects/project5.png";
import project6 from "@/../public/images/projects/project6.png";
import project7 from "@/../public/images/projects/project7.png";
import project8 from "@/../public/images/projects/project8.jpeg";
import project9 from "@/../public/images/projects/project9.jpg";
import project10 from "@/../public/images/projects/project10.jpeg";
import project11 from "@/../public/images/projects/project11.png";
import project12 from "@/../public/images/projects/project12.png";
import project13 from "@/../public/images/projects/project13.png";
import project14 from "@/../public/images/projects/project14.png";
import project15 from "@/../public/images/projects/project15.png";
import project16 from "@/../public/images/projects/project16.png";
import project17 from "@/../public/images/projects/project17.png";
import project18 from "@/../public/images/blog/blog4.jpeg";
import product3 from "@/../public/images/organ.png";
import project19_1 from "@/../public/images/projects/project19.1.png";
import project19_2 from "@/../public/images/projects/project19.2.png";
import project19 from "@/../public/images/projects/project19.png";
import project20 from "@/../public/images/projects/project20.jpg";
import project21 from "@/../public/images/projects/MotionAE.png";
import mmm272 from "@/../public/images/projects/mmm272.png"; // MMM-272 diagram


export const featureds = [
  {
    id: 21,
    category: "AI/ML",
    tag1: "Text-to-Motion",
    tag2: "VQVAE",
    tag3: "Transformer",
    title: "MMM-272: Enhanced Text-to-Motion Generation",
    img: mmm272,
    client: "Research Project",
    services: "AI Research & Development",
    technologies: "PyTorch, CLIP, FastAPI, SMPL, HumanML3D",
    website: "https://github.com/yourusername/mmm-272",
    intro: "Extended the Masked Motion Model (MMM) to support 272-dimensional motion representation, achieving state-of-the-art text-to-motion generation with improved BVH conversion quality.",
    overview: "The MMM-272 project represents a significant advancement in text-to-motion generation technology. By upgrading from 263-dimensional to 272-dimensional motion representation, the model achieves superior motion quality and eliminates the need for Inverse Kinematics during BVH conversion. The system includes direct SMPL joint rotations in 6D format, preserving subtle motion details and producing animation-ready output for game engines and professional animation software.",
    challenge: "Traditional text-to-motion models suffered from IK artifacts during BVH conversion and struggled to preserve fine-grained motion details like finger movements and joint twists. The existing 263-dimensional representation limited the model's ability to capture the full complexity of human motion, particularly for athletic and expressive movements.",
    solution: "Implemented a comprehensive solution involving: (1) Upgraded VQVAE encoder/decoder architecture to handle 272-dimensional latent space with 512 codebook size and 2× temporal downsampling, (2) Trained a transformer with 9 layers, 1024 embedding dimensions, and 16 attention heads on 300K iterations, (3) Integrated direct SMPL rotation recovery in 6D format eliminating IK artifacts, (4) Developed a production-ready FastAPI server with pre-loaded models for real-time inference (~2-3 seconds), and (5) Built automatic BVH conversion pipeline for seamless integration with Unity, Unreal Engine, and Blender.",
    gallery: [mmm272, project21, project19],
    results: [
      { title: "FID Score", value: "0.093", trend: "down", desc: "State-of-the-art motion realism on HumanML3D dataset (lower is better)" },
      { title: "Conversion Quality", value: "60%", trend: "up", desc: "Reduction in BVH conversion errors vs position-based methods" },
      { title: "Inference Speed", value: "2-3s", trend: "down", desc: "Real-time generation with model pre-loading optimization" },
      { title: "R-Precision", value: "11.4%", trend: "up", desc: "Top-3 text-motion matching accuracy" }
    ]
  },
  {
    id: 20,
    category: "AI/ML",
    tag1: "Motion Autoencoder",
    tag2: "HumanML3D Dataset",
    tag3: "Model Training",
    title: "Motion Autoencoder Training & Evaluation",
    img: project21, // main image for the project
    client: "Internal Research",
    services: "AI Development",
    technologies: "Python, PyTorch, NumPy, Matplotlib",
    website: "https://ialzouby.github.io/Motion-AutoEncoder/#bibtex",
    intro: "Developed a Motion Autoencoder to compress and reconstruct human motion data.",
    overview: "The MotionAE project aimed to learn compact latent representations of HumanML3D motion sequences, enabling efficient storage and high-quality reconstructions.",
    challenge: "Capturing fine-grained joint movement details while keeping the model lightweight for faster inference.",
    solution: "Designed and trained a custom PyTorch autoencoder, applied normalization strategies, and implemented a smooth visualization pipeline to compare original and reconstructed motions side-by-side.",
    gallery: [project20], // additional screenshots or visuals
    results: [
        { title: "Reconstruction Accuracy", value: "92%", trend: "up", desc: "High fidelity compared to original motion data." },
        { title: "Compression Ratio", value: "8x", trend: "up", desc: "Reduced storage requirements without major quality loss." },
        { title: "Training Time", value: "4h", trend: "down", desc: "Efficient convergence using GPU acceleration." }
    ]
},

    {
        id: 19,
        category: "AI/ML",
        tag1: "Motion Modeling",
        tag2: "HumanML3D Dataset",
        tag3: "AI Training",
        title: "MoMask Model Training & Evaluation",
        img: project19,
        client: "Client 15",
        services: "AI Development",
        technologies: "Python, PyTorch",
        website: "https://example.com",
        intro: "This project involved building the hospital infection map visualization.",
        overview: "We started with the goal of creating a usable and reliable system.",
        challenge: "The main challenge was balancing performance with deployment constraints.",
        solution: "We used a modular design and optimized data flow to solve the problems.",
        gallery: [project19_1, project19_2],
        results: [
          { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
          { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
          { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
      },
    {
      id: 1,
      category: "Hackathons",
      award: "2nd",
      tag1: "Hackathon",
      tag2: "NASA",
      tag3: "Sonification",
      title: "1st Place – 2023 NASA Hackathon: Solar/Moon Data Sonification",
      img: project6,
      client: "Client 6",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the 1st place – 2023 nasa hackathon: solar/moon data sonification.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 7,
      category: "Hackathons",
      award: "1st",
  
      tag1: "Hackathon",
      tag2: "FinTech",
      tag3: "AWS",
      title: "1st Place – 2024 Truist Immersive FinTech Experience",
      img: project8,
      client: "Client 7",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the 1st place – 2024 truist immersive fintech experience.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 2,
      category: "Hackathons",
      award: "1st",
  
      tag1: "Hackathon",
      tag2: "C++ & Python",
      tag3: "Leet Code",
      title: "1st Place – NC State Competitive Programming Hackathon",
      img: project20,
      client: "Client 9",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the unity vision ios app – nc state hackathon.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
        id: 3,
        category: "Hackathons",
        award: "1st",
    
        tag1: "Hackathon",
        tag2: "iOS",
        tag3: "Face Privacy",
        title: "2nd Place – NC State Hackathon: Unity Vision iOS App",
        img: project9,
        client: "Client 9",
        services: "Full-Stack Development",
        technologies: "Swift, Python, TensorFlow",
        website: "https://example.com",
        intro: "This project involved building the unity vision ios app – nc state hackathon.",
        overview: "We started with the goal of creating a usable and reliable system.",
        challenge: "The main challenge was balancing performance with deployment constraints.",
        solution: "We used a modular design and optimized data flow to solve the problems.",
        gallery: [project1, project2, project3],
        results: [
          { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
          { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
          { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
        ]
      },
    {
      id: 10,
      category: "Hackathons",
      award: "1st",
  
      tag1: "Hackathon",
      tag2: "Family Team",
      tag3: "Web Dev",
      title: "1st Place – HackNC 2024 at UNC Chapel Hill",
      img: project10,
      client: "Client 10",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the 1st place – hacknc 2024 at unc chapel hill.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 8,
      category: "AI/ML",
      award: "1st",
  
      tag1: "Hackathon",
      tag2: "Healthcare AI",
      tag3: "Organ Donation",
      title: "DCD Organ Donation Algorithm – Duke & UNC Research",
      img: product3,
      client: "Client 8",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the dcd organ donation algorithm – duke & unc research.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
  
  
    {
      id: 6,
      category: "AI/ML",
      tag1: "AI/ML",
      tag2: "iOS",
      tag3: "Model Deployment",
      title: "Wav2Lip Lip Sync Model iOS Deployment",
      img: project1,
      client: "Client 1",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the wav2lip lip sync model ios deployment.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 9,
      category: "AI/ML",
      tag1: "AI/ML",
      tag2: "BAMM",
      tag3: "CUDA",
      title: "Text-To-Motion Model Deployment",
      img: project2,
      client: "Client 2",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the text-to-motion model deployment.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 3,
      category: "AI/ML",
      tag1: "AI/ML",
      tag2: "Medical Imaging",
      tag3: "CNN",
      title: "ResNet CNN Fine-Tuned on CheXpert for Chest X-ray Classification",
      img: project4,
      client: "Client 3",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the resnet cnn fine-tuned on chexpert for chest x-ray classification.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 4,
      category: "AI/ML",
      tag1: "AI/ML",
      tag2: "Security",
      tag3: "OpenAI API",
      title: "GitScan: AI-Driven GitHub Repo Security Analyzer",
      img: project3,
      client: "Client 4",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the gitscan: ai-driven github repo security analyzer.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 5,
      category: "AI/ML",
      tag1: "AI/ML",
      tag2: "IOS",
      tag3: "AI4Health",
      title: "VitalHealth: AI-Powered Health Monitoring System",
      img: project15,
      client: "Client 5",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the vitalhealth: ai-powered health monitoring system.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
  
    {
      id: 11,
      category: "AI Infrastructure",
      tag1: "AI Infra",
      tag2: "Home Lab",
      tag3: "Fine-Tuning",
      title: "Fine-Tuning Cluster with Dell Servers & Tesla P100 GPUs",
      img: project17,
      client: "Client 11",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the fine-tuning cluster with dell servers & tesla p100 gpus.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 16,
      category: "Personal Explorations",
      tag1: "Hardware",
      tag2: "Restoration",
      tag3: "Apple",
      title: "Vintage Apple Device Restoration",
      img: project12,
      client: "Client 16",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the vintage apple device restoration.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 12,
      category: "Personal Explorations",
      tag1: "iOS",
      tag2: "AWS Amplify",
      tag3: "Notes App",
      title: "Cross-Platform Notes App with SwiftUI & AWS Amplify",
      img: project5,
      client: "Client 12",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the cross-platform notes app with swiftui & aws amplify.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 13,
      category: "Personal Explorations",
      tag1: "Django",
      tag2: "PWA",
      tag3: "Student Platform",
      title: "DevLink: UNCC Collaboration Platform (Django + PWA)",
      img: project14,
      client: "Client 13",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the devlink: uncc collaboration platform (django + pwa).",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 14,
      category: "Personal Explorations",
      tag1: "Node.js",
      tag2: "MongoDB",
      tag3: "E-Commerce",
      title: "TechnoLab Market: Node.js + Atlas Web App",
      img: project13,
      client: "Client 14",
      services: "Full-Stack Development",
      technologies: "React, Node.js, MongoDB",
      website: "https://example.com",
      intro: "This project involved building the technolab market: node.js + atlas web app.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
    {
      id: 15,
      category: "Personal Explorations",
      tag1: "DataViz",
      tag2: "Healthcare",
      tag3: "Map",
      title: "Hospital Infection Map Visualization",
      img: project11,
      client: "Client 15",
      services: "Full-Stack Development",
      technologies: "Swift, Python, TensorFlow",
      website: "https://example.com",
      intro: "This project involved building the hospital infection map visualization.",
      overview: "We started with the goal of creating a usable and reliable system.",
      challenge: "The main challenge was balancing performance with deployment constraints.",
      solution: "We used a modular design and optimized data flow to solve the problems.",
      gallery: [project1, project2, project3],
      results: [
        { title: "Efficiency", value: "25%", trend: "up", desc: "Improved processing speed." },
        { title: "User Growth", value: "15%", trend: "up", desc: "Increased engagement." },
        { title: "Cost Reduction", value: "10%", trend: "down", desc: "Lowered infrastructure cost." }
      ]
    },
  
  ];
  
