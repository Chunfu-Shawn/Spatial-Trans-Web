import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Space} from "antd";

export default function GetStarted(){
    return(
        <div name={"Get started"}>
            <a id={"Get started"} style={{position: 'relative', top: "-150px"}}></a>
            <h3>Get started (step by step)</h3>
            <p>Here, we use the scRNA-seq data of <b>mouse fetal cerebral cortex (E14.5)</b>, which was randomly sampled
                to 3,000 cells for speeding things up, to guide users through the Spatial Mapping workflow, which is the
                key module in STellaris. This tutorial are divided into data preparation, Job submission, section blast,
                spatial mapping and data export.
            </p>
            <h4>1. Data preparation</h4>
            <p>The spatial mapping analysis requires two files uploaded by users: 1) cell-by-gene count matrix file
                measured by raw counts where column name are gene symbols and row name are unique cell ids; 2) meta
                information of cells requiring gene symbols in the first column that are in same order as count matrix
                and cell type (or cluster) labels in one of the latter columns titled with “cell_type”. Note that the
                identifiers of genes should only be gene symbols currently. These two files should be tab- or comma-delimited
                (.tsv, .txt or .csv)  in gzip or zip compression (.gz or .zip). </p>
            <p>A desirable count matrix file looks like:</p>
            <div style={{textAlign:"center"}}>
                <Image src={"/images/tutorial/counts_matrix_example.png"} width={600} height={350}
                       alt={"counts_matrix_example"} style={{borderStyle:"dashed"}}/>
            </div>
            <p>A desirable label file looks like:</p>
            <div style={{textAlign:"center"}}>
                <Image src={"/images/tutorial/labels_example.png"} width={600} height={200}
                       alt={"labels_example"} style={{borderStyle:"dashed"}}/>
            </div>
            <h4>2. Submit a job</h4>
            <h5>Basic information</h5>
            <ul>
                <li>Enter a tile of your job in “Job Title” box (no more than 80 characters).</li>
                <li>Enter an email address to receive the notification of project progress (optional but highly
                    recommended).</li>
                <li>Select candidate ST sections matching your scRNA-seq by specifying “Species”, “Organ” and “Tissue”.
                    This step is crucial that only the ST sections meeting these conditions will be considered in the
                    following analyses.</li>
            </ul>
            <h5>Data upload</h5>
            <ul>
                <li>Click on “Select a count matrix file” button on the home page or Mapping page in the navigator bar
                    and select a prepared count matrix file.</li>
                <li>Click on “Select a label file” to select a meta file with cell type annotation.</li>
                <li>Click on “Upload” and wait for a second.</li>
            </ul>
            <div style={{textAlign:"center"}}>
                <Image src={"/images/tutorial/get_started.png"} width={800} height={450}
                       alt={"get_started"} style={{borderStyle:"dashed"}}/>
            </div>
            <h4>3. Section blast</h4>
            <p>After user data were successfully uploaded, you will receive a confidential URL of your requested job and
                be redirected to a running page. The next step we term as &quot;section blast&quot; will automatically start. In brief,
                this analysis aims to help researcher rapidly search for the best match reference ST section in samples of
                interest. This step is generally fast and will take about 2~3 min.
            </p>
            <div style={{textAlign:"center"}} >
                <Space>
                    <Image src={"/images/tutorial/email.png"} width={400} height={230}
                           alt={"email"} style={{borderStyle:"dashed"}}/>
                    <Image src={"/images/tutorial/section_blast.png"} width={600} height={330}
                           alt={"section_blast"}/>
                </Space>
            </div>
            <p>
                When section blast is finished, a matching score of each ST section will be returned in descending order.
                A table with additional attributes of target ST sections (104 sections in this example) will also be reported.
                To choose the section to which you want to map, you can manipulate this table by reordering by a certain
                feature or filtering out some sections in the table header. You can also click the &quot;ST ID&quot; and navigate
                to Datasets page of ST dataset that you are interested in for further information. Once you have determined
                the ST section used for spatial mapping, you can click the &quot;select&quot; button on the right to proceed.
            </p>
            <div style={{textAlign:"center"}}>
                <Space>
                    <Image src={"/images/tutorial/section_bar.png"} width={500} height={300}
                           alt={"section_bar"}/>
                    <Image src={"/images/tutorial/section_table.png"} width={600} height={350}
                           alt={"section_table"}/>
                </Space>
            </div>
            <p>
                Here we select the top-ranked ST section, a spatial transcriptomic map of mouse fetal brain coronal plane
                at E14.5, which is generated by our lab using Stereo-seq. This enriched ST section is in the same stage
                as our query scRNA-seq data, underlining the feasibility of section blast.
            </p>
            <div style={{textAlign:"center"}}>
                <Image src={"/images/tutorial/section_table.png"} width={800} height={450}
                       alt={"section_table"}/>
            </div>
            <h4>3. Spatial mapping</h4>
            <p>
                A Confirming dialog will pop up when you click the &quot;select&quot; button where you can set the advanced parameters
                for spatial mapping. Here we use the defaults and click &quot;Continue&quot; to start the process of spatial mapping,
                and this will redirect us to another running page. Note that spatial mapping will generally take about
                30 min for around 20,000 single cells, please be patient, you can leave aside the running page and remember
                to come back later.
            </p>
            <p>
                You will be automatically redirected to the result page of spatial mapping when the job is completed.
                The interpretation of spatial mapping results will be discussed in the next tutorial &quot;Result
                interpretation&quot;.
            </p>
        </div>
    )
}