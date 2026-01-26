import { presentations } from "@/../public/data/PresentationData";
import PresentationDetailsClient from "./PresentationDetailsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const presentation = presentations.find((p) => p.slug === params.slug);

    if (!presentation) {
        return {
            title: "Presentation Not Found",
            description: "The requested presentation could not be found.",
        };
    }

    return {
        title: `${presentation.title} | ML Presentations`,
        description: presentation.description,
        keywords: presentation.tags,
        openGraph: {
            title: presentation.title,
            description: presentation.description,
            type: "article",
        },
    };
}

const PresentationDetailsPage = ({ params }: { params: { slug: string } }) => {
    const presentation = presentations.find((p) => p.slug === params.slug);

    if (!presentation) {
        return (
            <div className="pt-120 pb-120 text-center container">
                <h2 className="n5-color">Presentation not found</h2>
                <p className="n4-color">The presentation you are looking for does not exist.</p>
            </div>
        );
    }

    // Generate JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "PresentationDigitalDocument",
        "name": presentation.title,
        "description": presentation.description,
        "author": {
            "@type": "Person",
            "name": "Issam Alzouby"
        },
        "datePublished": presentation.date,
        "keywords": presentation.tags.join(", "),
        "learningResourceType": "Presentation",
        "educationalLevel": "Intermediate",
        "inLanguage": "en"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PresentationDetailsClient presentation={presentation} />
        </>
    );
};

export default PresentationDetailsPage;
