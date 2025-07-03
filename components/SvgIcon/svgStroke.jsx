import { useEffect, useState } from "react";


function SvgIconStroke({src, fill= "black", height=100, width=100}){
    const [svgContent, setSvgContent] = useState("")

    useEffect(() => {
        fetch(src)
        .then((res) => res.text())
        .then((data) => {
            const parser = new DOMParser()
            const svgDoc = parser.parseFromString(data, "image/svg+xml")
            const svgElement = svgDoc.querySelector("svg")

            if (svgElement) {

                // Remove width & height if "auto"
                if (width !== "auto") {
                    svgElement.setAttribute("width", "100%");
                } else {
                    svgElement.removeAttribute("width");
                }
                
                if (height !== "auto") {
                    svgElement.setAttribute("height", "100%");
                } else {
                    svgElement.removeAttribute("height");
                }

                //set fill
                // svgElement.querySelectorAll("[fill]").forEach((el) => {
                //     el.setAttribute("fill", fill)
                // })
                svgElement.querySelectorAll("path, circle, polygon").forEach((el) => {
                    el.setAttribute("stroke", fill);
                });

                // Convert back to string
                setSvgContent(new XMLSerializer().serializeToString(svgElement))
            }
        })
        .catch((error) => console.error("Error loading SVG:", error))
    }, [src, fill, height, width])

    return (
        <div 
            style={{ width: width === "auto" ? "auto" : width, height: height === "auto" ? "auto" : height }} 
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    )
}

export default SvgIconStroke