import blog1 from "@/../public/images/blog1.gif";
import blog2 from "@/../public/images/blog2.jpg";
import blog3 from "@/../public/images/blog3.webp";
import blog4 from "@/../public/images/blog4.jpeg";
import blog5 from "@/../public/images/blog4.png";
import blog6 from "@/../public/images/blog6.webp";
import blog7 from "@/../public/images/blog7.jpg";
import blog8 from "@/../public/images/blog8.png";
import blog9 from "@/../public/images/blog9.jpg";
import blog10 from "@/../public/images/blog10.webp";
import blog11 from "@/../public/images/blog11.jpeg";
import blog12 from "@/../public/images/blog12.jpeg";
import blog13 from "@/../public/images/blog13.jpeg";
import blog14 from "@/../public/images/blog14.png";
import blog15 from "@/../public/images/blog15.jpg";
import blog16 from "@/../public/images/blog16.png";
import blog17 from "@/../public/images/blog17.jpg";
import blog18 from "@/../public/images/blog18.png";
import blog19 from "@/../public/images/blog19.png";
export const blogs = [
    {
      id: 1,
      slug: "genhmr-3d-pose-estimation-aaai-2025",
      img: blog1,
      date: "Feb 15, 2025",
      tag: "Research",
      title: "GenHMR: A Breakthrough in 3D Human Pose and Shape Estimation – Accepted at AAAI 2025",
      author: "Issam Alzouby",
      content: "GenHMR sets a new benchmark in 3D human pose estimation by leveraging generative modeling to capture uncertainty and diversity in predictions.",
      sections: [
        {
          heading: "Background",
          text: "3D human pose and shape estimation is critical in animation, healthcare, and sports. Traditional models rely on deterministic predictions that fail in occlusion-heavy settings.",
          image: blog2,
        },
        {
          heading: "Methods",
          text: "GenHMR uses a diffusion-based decoder conditioned on 2D keypoints and silhouettes. It leverages the SMPL model for realistic human shapes.",
          bullets: [
            "Conditioned on OpenPose 2D keypoints.",
            "Trained with a large synthetic dataset.",
            "Incorporates a VAE encoder for latent diversity.",
          ],
        },
        {
          quote: {
            text: "This changes the game for real-time, reliable human modeling in the wild.",
            author: "Lead Author, AAAI 2025",
          },
        },
        {
          heading: "Results and Impact",
          text: "The model outperforms previous baselines on 3DPW and Human3.6M datasets. It also shows promising transfer performance on real-world sports video data.",
          videoImage: blog3,
          videoId: "dQw4w9WgXcQ" // Replace with real ID
        }
      ]
    },
    {
      id: 2,
      img: blog2,
      date: "Jan 15, 2025",
      tag: "Infrastructure",
      title: "From Server Hunting to VM Mastery: My Proxmox Power Play",
      author: "Issam Alzouby",
    },
    {
      id: 3,
      img: blog3,
      date: "Jan 6, 2025",
      tag: "Security",
      title: "GitScan: Securing GitHub Repositories with AI-Driven Insights 🚀",
      author: "Issam Alzouby",
    },
    {
      id: 4,
      img: blog4,
      date: "Dec 30, 2024",
      tag: "Lifestyle",
      title: "Rediscovering Balance: A Week Without Screens in the Tennessee Mountains",
      author: "Issam Alzouby",
    },
    {
      id: 5,
      img: blog5,
      date: "Dec 25, 2024",
      tag: "Linux",
      title: "Why I Moved from Ubuntu to Fedora — and Fell in Love",
      author: "Issam Alzouby",
    },
    {
      id: 6,
      img: blog6,
      date: "Dec 16, 2024",
      tag: "DIY",
      title: "How I 3D-Printed My GitHub Contribution Skyline for 2024",
      author: "Issam Alzouby",
    },
    {
      id: 7,
      img: blog7,
      date: "Dec 8, 2024",
      tag: "Dev Project",
      title: "Building DevLink: A Collaborative Software Engineering Journey at UNC Charlotte",
      author: "Issam Alzouby",
    },
    {
      id: 8,
      img: blog8,
      date: "Oct 16, 2024",
      tag: "Tutorial",
      title: "How to Fix the iOS Update 'Unable to Verify' Error on iPad",
      author: "Issam Alzouby",
    },
    {
      id: 9,
      img: blog9,
      date: "Sep 1, 2024",
      tag: "Cybersecurity",
      title: "The Haliburton Attack: A Stark Reminder of Evolving Cybersecurity Threats",
      author: "Issam Alzouby",
    },
    {
      id: 10,
      img: blog10,
      date: "Aug 21, 2024",
      tag: "Cybersecurity",
      title: "The Impact of the Recent Social Security Leak: A Cybersecurity Perspective",
      author: "Issam Alzouby",
    },
    {
      id: 11,
      img: blog11,
      date: "Aug 16, 2024",
      tag: "Marketing",
      title: "The Pitfalls of Using Static Lists in HubSpot Workflows",
      author: "Issam Alzouby",
    },
    {
      id: 12,
      img: blog12,
      date: "Aug 10, 2024",
      tag: "CS Basics",
      title: "Understanding Big O Notation: A Beginner's Guide",
      author: "Issam Alzouby",
    },
    {
      id: 13,
      img: blog13,
      date: "Aug 6, 2024",
      tag: "Forensics",
      title: "Understanding the CrowdStrike Falcon Sensor BSOD Crash",
      author: "Issam Alzouby",
    },
    {
      id: 14,
      img: blog14,
      date: "Jul 27, 2024",
      tag: "Incident Analysis",
      title: "CrowdStrike Update Causes Global Microsoft Outage",
      author: "Issam Alzouby",
    },
    {
      id: 15,
      img: blog15,
      date: "Jul 25, 2024",
      tag: "Hackathons",
      title: "How to Succeed at Hackathons: A Guide to Making the Most of Your Experience",
      author: "Issam Alzouby",
    },
    {
      id: 16,
      img: blog16,
      date: "Jul 13, 2024",
      tag: "Healthcare",
      title: "iReferral, Bringing Tech to Organ Donations",
      author: "Issam Alzouby",
    },
    {
      id: 17,
      img: blog17,
      date: "Jul 12, 2024",
      tag: "Cybersecurity",
      title: "The Largest Cybersecurity Community in North America",
      author: "Issam Alzouby",
    },
    {
      id: 18,
      img: blog18,
      date: "Jul 12, 2024",
      tag: "Healthcare",
      title: "Afflo Donor Referral Software; Revolutionizing HealthCare",
      author: "Issam Alzouby",
    },
    {
      id: 19,
      img: blog19,
      date: "Jul 11, 2024",
      tag: "AI in Education",
      title: "Harnessing AI for Academic Success: A Student's Perspective",
      author: "Issam Alzouby",
    },
  ];