import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Anchor, Layout, Typography, Card, Col, Row, Alert, Table, Select, Button} from 'antd';
import datePageCss from "../../../styles/datasetpage.module.css";
import React from "react";
import VitessceVisual from "../../../components/Datasets/DataPage/VitessceModule.js";
import {data} from '../../../components/Datasets/getData&Options.js';
import {useEffect, useState} from "react";
import Error from "next/error";

const { Sider } = Layout;
const { Link } = Anchor;

export async function getServerSideProps(context) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
        "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/getDatasetsJSON/"+context.params.st_id)
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }
    // Pass post data to the page via props
    return { props: data }}

export default function DataPage(props) {
    const [targetOffset, setTargetOffset] = useState(undefined);
    const duplicateOption  = ['RA_A_1', 'RA_A_2', 'RA_A_3', 'RA_B_1', 'RA_B_2', 'RA_B_3', 'RA_C_1', 'RA_C_2', 'RA_C_3',
        'SPA_A_1', 'SPA_A_2', 'SPA_A_3', 'SPA_B_1', 'SPA_B_2', 'SPA_B_3', 'SPA_C_1', 'SPA_C_2', 'SPA_C_3']
    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            width:'40%'
        },
        {
            title: 'Value',
            dataIndex: 'value',
        },
    ];
    const dataSample =[
        {
            key:"Species",
            value:props.species
        },
        {
            key:"Strain",
            value:props.strain
        },
        {
            key:"Developmental Stage",
            value:props.developmental_stage
        },
        {
            key:"Organ",
            value:props.organ
        },
        {
            key:"Tissue",
            value:props.tissue
        },
    ]
    const dataDuplicates =[
        {
            key:"Duplicate",
            value:props.duplicate
        },
        {
            key:"Duplicate ID",
            value:props.duplicate_id
        },
        {
            key:"Data format",
            value:props.data_format
        }
    ]

    useEffect(() => {
        setTargetOffset(window.innerHeight / 2);
        console.log(props)
    }, []);

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Datasets | '+ props.id}</title>
            </Head>
            <Layout>
                <Sider style={{backgroundColor:"transparent"}}>
                    <Anchor targetOffset={targetOffset} style={{paddingTop:"20vh",paddingLeft:"8vh",fontSize:18}}>
                        <Link href="#info" title="Information">
                            <Link href={"#sample"} title='Sample'/>
                            <Link href={"#duplicates"} title='Duplicates'/>
                        </Link>
                        <Link href="#source" title="Source" />
                        <Link href="#view" title="View" />
                        <Link href="#data" title="Data Download"/>
                    </Anchor>
                </Sider>
                <div className={"modal-body-stw"} style={{textAlign: "left",paddingLeft:'3%',paddingRight:'15%'}}>
                    <h3>Data</h3>
                    <h1> {props.id} </h1><br/><br/>
                    <h2 id="info" > Information </h2>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={30}>
                            <Col span={10}>
                                <h4>ST ID</h4>
                                <div className={"description"}>{props.id}</div>
                            </Col>
                            <Col span={8}>
                                <h4>Date Published</h4>
                                <div className={"description"}>{props.date_published}</div>
                            </Col>
                            <Col span={6}>
                                <h4>Method</h4>
                                <div className={"description"}>{props.method}</div>
                            </Col>
                        </Row>
                    </div><br/>
                    <div style={{marginLeft:"5%"}}>
                        <Row>
                            <Col span={3}><h3 id={'sample'}>Sample</h3></Col>
                            <Col span={5}>
                            {props.pathological==="TRUE"?
                            <Alert
                                message={"Pathological Tissue"}
                                type="warning"
                                showIcon
                            />:
                            <Alert
                                message={"Normal Tissue"}
                                type="success"
                                showIcon
                            />}</Col>
                        </Row><br/>
                        <div className="site-card-wrapper">
                            <Table columns={columns} pagination={false} dataSource={dataSample} size="middle" />
                        </div><br/>
                        <h3 id={'duplicates'}>Duplicates</h3>
                        <Table columns={columns} pagination={false} dataSource={dataDuplicates} size="middle" />
                    </div>
                    <br/><br/>
                    <h2 id={'source'}>Source</h2>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={10}>
                            <Col span={9}>
                                <h4>Title</h4>
                                <p>{props.title}</p>
                            </Col>
                            <Col span={4}>
                                <h4>Journal</h4>
                                <p>{props.journal}</p>
                            </Col>
                            <Col span={3}>
                                <h4>PMID</h4>
                                <p>{props.pmid}</p>
                            </Col>
                            <Col span={8}>
                                <h4>URL</h4>
                                <a href={props.URL}>{props.URL}</a>
                            </Col>
                        </Row>
                    </div><br/><br/>
                        <h2 id={'view'}>View</h2>
                        <VitessceVisual duplicateOption={duplicateOption}></VitessceVisual>
                    <br/><br/>
                        <h2 id={'data'}>Data and Download</h2>
                        <div className={datePageCss.text}>
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                        eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                        eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                        eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        </div>
                </div>
        </Layout>
        </LayoutCustom>
    )
}