import React from "react";
import Image from "next/image";
import {Space} from "antd";
import Link from "next/link.js";

export default function GeneSearch(){
    return (
        <div name={"Gene Search"}>
            <a id={"Gene Search"} style={{position: 'relative', top: "-150px"}}></a><br/>
            <h2>Gene Search</h2>
            <p>
                In this tutorial, we will show you how to retrieve gene expression characteristic from the spatial
                perspective, such as spatially variable gene expression and tissue-wide gene expression, which was
                summarized on top of our ST dataset catalog.
            </p>
            <p>
                1. Click on &quot;Search&quot; tab in the navigator bar. Enter a gene of interest to search. Here we use
                human ID2 gene as an example.
            </p>
            <div style={{textAlign:"center"}} >
                <Image src={"/images/tutorial/gene/gene1.png"} width={800} height={450}
                       alt={"gene1"}/>
            </div>
            <p>
                2. A list of partially matching genes are returned and Click your desirable gene to proceed. Here we select
                human ID2 gene in the second row.
            </p>
            <div style={{textAlign:"center"}} >
                <Image src={"/images/tutorial/gene/gene2.png"} width={800} height={450}
                       alt={"gene2"}/>
            </div>
            <p>
                3. At the beginning of this page, we offer a summary of whether or not the query gene is defined as a
                spatially variable gene (SVG) across organs. In this example, human ID2 gene was determined as SVG in
                colon, liver and heart. The details of it SVG characteristic will be shown later.
            </p>
            <p>
                4. The &quot;Summary&quot; tab shows the basic properties of query gene.
            </p>
            <div style={{textAlign:"center"}} >
                <Image src={"/images/tutorial/gene/summary.png"} width={800} height={380}
                       alt={"summary"}/>
            </div>
            <p>
                5. The &quot;SVG Expression&quot; tab visualizes the gene expression in samples where it was determined as SVG.
                A randomly picked ST section for a certain organ/tissue is displayed to view the spatial gene expression
                characteristic. A table of SVG details across ST datasets and sections is also provided and ready to
                download. You can also skip to &quot;Datasets&quot; to explore ST section of your interest.
            </p>
            <div style={{textAlign:"center"}} >
                <Image src={"/images/tutorial/gene/SVG_expression.png"} width={800} height={550}
                       alt={"SVG_expression"}/>
            </div>
            <p>
                6. We also provide a summary of bulk tissue gene expression measured by the percentile of log(CPM) across
                ST sections, which was displayed in descending order.
            </p>
            <div style={{textAlign:"center"}} >
                <Image src={"/images/tutorial/gene/expression_rank_score.png"} width={800} height={500}
                       alt={"expression_rank_score"}/>
            </div>
            <p>
                7. Navigate to “Download” tab to export the underlying files supporting this page.
            </p>
            <div style={{textAlign:"center"}} >
                <Image src={"/images/tutorial/gene/gene_download.png"} width={800} height={500}
                       alt={"gene_download"}/>
            </div>
        </div>
    )
}