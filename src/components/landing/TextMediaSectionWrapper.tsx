import React from "react";
import TruthSection from "./TruthSection";
import PartnerSection from "./PartnerSection";

export default function TextMediaSectionWrapper(props: any) {
    const { section } = props;
    const position = section?.position;

    // Heuristic: PartnerSection supports 'left' and 'right' layouts.
    if (position === "left" || position === "right") {
        return <PartnerSection section={section} />;
    }

    // Fallback to TruthSection (top/bottom or undefined)
    return <TruthSection section={section} />;
}
