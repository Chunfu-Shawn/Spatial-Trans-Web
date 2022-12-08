import {Button, Col, Collapse, Divider, Row} from "antd";
import {LinkOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React,{useContext} from "react";
import AttributeLayout from "./AttributeLayout";
import Link from "next/link.js";
import TranscriptTable from "./TranscriptTable.js";
import GeneExpressionBoxPlot from "./GeneExpressionBoxPlot";
import {exportToCsv} from "../util";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

const { Panel } = Collapse;

export default function Features(props){
    const geneContext = useContext(GeneContext);
    const pseudoExpr = geneContext.dataPseudoEr
    return(
        <>
            <Divider orientation="left" orientationMargin="0">
                <b>Features </b>
                <Link href={'/help/manual/search#gene_page_features'}><a target={"_blank"}><QuestionCircleOutlined/></a></Link>
            </Divider>
            <div name={"Genomic Context"} style={{marginLeft:"20px"}}>
                <a id={"Genomic Context"} style={{position: 'relative', top: "-300px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed><b>Genomic Context</b></Divider>
                <AttributeLayout attribute={"Location"}>
                    <>
                        <a target={"_blank"}
                           href={`https://www.ensembl.org/${props.data.organism === "Homo sapiens"?"Homo_sapiens":"Mus_musculus"}/Location/View?g=${props.data.ensembl_id}`}
                           rel="noreferrer">
                            Chromosome  {`${props.data.chrom_scaf}: ${props.data.start}-${props.data.end}`}<LinkOutlined />
                        </a>
                        <span>{props.data.strand === "1"?" forward strand.":" reverse strand."}</span>
                    </>
                </AttributeLayout>
                <AttributeLayout attribute={"Chromosomal Location"}>
                    {props.data.map_location}
                </AttributeLayout>
            </div>
            <div name={"Expression"} style={{marginLeft:20}}>
                <a id={"Expression"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0">
                    <Row gutter={[20,0]} style={{width:400}}>
                        <Col span={16}>
                            <b>Pseudobulk RNA-seq Expression</b>
                        </Col>
                        <Col span={8}>
                            <Button size={"small"}
                                    onClick={() => exportToCsv(pseudoExpr,`${props.data.symbol}_pseudobulk_RNA-seq_expression`)}
                            >
                                Export to CSV
                            </Button>
                        </Col>
                    </Row>
                </Divider>
                <GeneExpressionBoxPlot/>
            </div>
            <div name={"Transcript"} style={{marginLeft:"20px"}}>
                <a id={"Transcript"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed>
                    <Row gutter={[20,0]} style={{width:"auto"}}>
                        <Col span={14}>
                            <b>Transcript</b>
                        </Col>
                        <Col span={10}>
                            <Button size={"small"}
                                    onClick={() => exportToCsv(props.trans,`${props.data.symbol}_transcripts`)}
                            >
                                Export to CSV
                            </Button>
                        </Col>
                    </Row>
                </Divider>
                <Collapse collapsible="header" defaultActiveKey={['1']} bordered={false}>
                    <Panel
                        header={
                        <div style={{width:"1000px"}}>
                            <span>This gene has <b>{props.trans.length}</b> transcript(s), click to show or hide the table.</span>
                        </div>
                    }
                        key="1">
                        <TranscriptTable/>
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}