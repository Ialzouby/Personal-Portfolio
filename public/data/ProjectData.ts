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
import robotImg from "@/../public/images/projects/robot.png";
import expressiveHeadGif from "@/../public/images/projects/expressivehead.gif";
import waterproofGif from "@/../public/images/projects/waterproof.gif";
import raceDroneImg from "@/../public/images/projects/RaceDrone.jpg";


export const featureds = [
  {
    id: 21,
    category: "AI/ML",
    tag1: "Text-to-Motion",
    tag2: "VQVAE",
    tag3: "Transformer",
    title: "MMM-272: Enhanced Text-to-Motion Generation",
    description: "State-of-the-art text-to-motion generation with 272-dimensional representation, achieving superior animation quality for game engines.",
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
    id: 22,
    category: "Robotics",
    tag1: "Humanoid",
    tag2: "AI Control",
    tag3: "Sensor Fusion",
    title: "Humanoid Robot",
    description: "Advanced humanoid robotics system integrating AI-powered motion control, computer vision, and real-time sensor fusion. Features autonomous navigation, human interaction capabilities, and adaptive learning algorithms for dynamic environments.",
    img: robotImg,
    client: "Research Project",
    services: "Robotics Engineering",
    technologies: "ROS2, Python, C++, Computer Vision, Reinforcement Learning",
    website: "#",
    intro: "Development of an advanced humanoid robotics system with AI-powered capabilities.",
    overview: "This project focuses on creating a versatile humanoid robot capable of operating in dynamic environments. By integrating state-of-the-art motion control, computer vision, and sensor fusion, the system achieves robust autonomous navigation and natural human interaction.",
    challenge: "Achieving stable bipedal locomotion and seamless sensor fusion for real-time decision making in unstructured environments while maintaining energy efficiency.",
    solution: "Developed a hierarchical control architecture combining model-predictive control for stability with reinforcement learning for adaptive behaviors. Implemented a custom sensor fusion engine processing LiDAR and camera data for precise localization and mapping.",
    gallery: [robotImg],
    results: [
      { title: "Walking Speed", value: "1.5m/s", trend: "up", desc: "Stable locomotion speed" },
      { title: "Battery Life", value: "4h", trend: "up", desc: "Continuous operation time" },
      { title: "Task Success", value: "95%", trend: "up", desc: "Autonomous navigation success rate" }
    ]
  },
  {
    id: 23,
    category: "Robotics",
    tag1: "17-DOF",
    tag2: "Expressive AI",
    tag3: "ROS/OpenAI",
    title: "Humanoid Expressive Head – 17-DOF",
    description: "A humanoid expressive robotic head built entirely from fully 3D-printed structural components and servo actuators, designed for high-DOF facial expression and embodied interaction. The system is integrated with ROS for real-time control and perception, and interfaces with the OpenAI API for AI-driven behavior and interaction.",
    img: expressiveHeadGif,
    client: "Research Project",
    services: "Robotics & AI Interaction",
    technologies: "ROS, Python, OpenAI API, 3D Printing, Servo Actuation",
    website: "#",
    intro: "Development of a highly expressive 17-DOF humanoid robotic head for embodied AI interaction.",
    overview: "This project presents a 17-degree-of-freedom humanoid expressive robotic head, constructed using fully 3D-printed mechanical components and servo-based actuation. The platform is integrated with ROS for modular control and extensibility, and leverages the OpenAI API to support AI-driven interaction and expressive behavior.",
    challenge: "Developing a low-cost, highly expressive robotic face with realistic motion capabilities while maintaining mechanical robustness and ease of assembly. Integrating high-level AI reasoning (OpenAI) with low-level real-time servo control (ROS) for natural interaction.",
    solution: "Designed a 17-DOF actuation scheme controlling eyebrows (2), forehead (2), cheeks (2), jaw, upper-lip, and eyes (8 - independent eyelid and eyeball motion). Created a custom silicone skin via mold casting for realistic appearance. Implemented a ROS-based control architecture bridging the physical hardware with AI language models.",
    gallery: [expressiveHeadGif],
    results: [
      { title: "DOF", value: "17", trend: "up", desc: "Degrees of freedom for facial expression" },
      { title: "Interaction", value: "Real-time", trend: "up", desc: "AI-driven conversational response" },
      { title: "Fabrication", value: "100%", trend: "up", desc: "3D printed structural components" }
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
    description: "Transforming NASA's solar and lunar data into immersive audio experiences, making space exploration accessible through sound.",
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
    description: "Solved complex algorithmic challenges with optimized C++ and Python solutions, demonstrating advanced problem-solving skills.",
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
    category: "Robotics",
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
    id: 24,
    category: "Robotics",
    tag1: "Hardware",
    tag2: "FPV Drone",
    tag3: "Electronics",
    title: "Waterproof FPV Drone – Underwater Capable",
    description: "A custom-built FPV drone designed for extreme conditions, capable of signal transmission through water. Components are sealed with conformal coating for collision and water resistance, powered by high-discharge LiPo batteries.",
    img: waterproofGif,
    client: "Personal Project",
    services: "Hardware Engineering",
    technologies: "Betaflight, SpeedyBee FC, Crossfire RX/TX, Conformal Coating",
    website: "#",
    intro: "Engineering a robust, waterproof FPV drone for all-weather and underwater flight capability.",
    overview: "This project involves the complete build and configuration of a waterproof FPV drone. The goal was to overcome the challenges of RF transmission through water and protect sensitive electronics from moisture damage, enabling flight in rain or submersion.",
    challenge: "Ensuring 100% water resistance for sensitive flight controllers and ESCs while maintaining cooling performance. Overcoming signal loss when transitting through water.",
    solution: "Applied multiple layers of silicone modified conformal coating to all PCBs. Selected specific low-frequency antennas for better penetration. Configured Betaflight for specific motor protocols suited for resistance.",
    gallery: [waterproofGif],
    results: [
      { title: "Waterproof", value: "IP68", trend: "up", desc: "Fully submersible electronics" },
      { title: "Range", value: "1km+", trend: "up", desc: "Reliable Crossfire link" },
      { title: "Durability", value: "High", trend: "up", desc: "Impact and water resistant" }
    ]
  },
  {
    id: 25,
    category: "Robotics",
    tag1: "High-Speed",
    tag2: "Digital FPV",
    tag3: "Racing",
    title: "5\" FPV Digital Race Drone",
    description: "High-performance 5-inch FPV racing drone featuring a DJI Digital Video System for HD low-latency feeds. Built for speed and precision, utilizing a SpeedyBee flight controller and Crossfire long-range link, finely tuned in Betaflight for locked-in handling.",
    img: raceDroneImg,
    client: "Personal Project",
    services: "Drone Racing & Engineering",
    technologies: "Betaflight, DJI O3/Vista, Crossfire, SpeedyBee F7",
    website: "#",
    intro: "A high-speed digital FPV racer designed for precision and low-latency performance.",
    overview: "This project showcases a custom-built 5-inch racing drone optimized for high-speed maneuvers and HD clarity. Integrating the DJI digital ecosystem provides crystal clear video feeds, while the Crossfire link ensures rock-solid control at near-zero latency.",
    challenge: "Optimizing PID loops and filter settings in Betaflight to eliminate prop wash and vibration at high throttle, while managing heat dissipation for the digital video transmitter.",
    solution: "Custom Betaflight tuning for locked-in rates and PID response. Strategic placement of components for center-of-gravity balance and maximum airflow cooling.",
    gallery: [raceDroneImg],
    results: [
      { title: "Speed", value: "120km/h+", trend: "up", desc: "Top speed performance" },
      { title: "Latency", value: "28ms", trend: "down", desc: "Low-latency HD video feed" },
      { title: "Video", value: "1080p", trend: "up", desc: "Digital HD FPV feed" }
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

