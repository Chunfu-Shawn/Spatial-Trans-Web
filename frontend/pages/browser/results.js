import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../../components/LayoutCustom.js'
import {Col, Input, Row, Select, Space, Table} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import SearchResultTable from "../../components/Browser/searchResultTable.js";
const { Search } = Input;
const { Option } = Select;

export async function getServerSideProps(context) {
    // if geneName is not provided, return 404 Page
    if ( typeof context.query.geneName === 'undefined' || !context.query.geneName ||
        typeof context.query.species === 'undefined' ||
        !( context.query.species === "All" || context.query.species === "Human" || context.query.species === "Mouse") ||
        typeof context.query.idType === 'undefined' ||
        !( context.query.idType === "HGNC" || context.query.idType === "Ensembl" || context.query.idType === "Entrez")
    )
        {
            return {
                redirect: {
                    destination: '/browser',
                    permanent: false,
                }
            }
        }
    const res = await fetch((process.env.NODE_ENV==="production"?
            "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/genelist/"+
        context.query.species + '/' +
        context.query.idType + '/' +
        context.query.geneName
    )
    const data = await res.json()

    // Pass post data to the page via props
    return {
        props: {
            searchName:context.query.geneName,
            idType: context.query.idType,
            species: context.query.species,
            data:data.map(data => {
                return {key:data.gene_id,...data}
            }),
        }
    }
}

export default function Results(props) {
    let title = `${siteTitle}| Browse Data`
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('HGNC');
    const [species, setSpecies] = useState('All');
    const UPLOAD_URL = 'http://localhost:3000/browser/results'
    const router = useRouter()
    const onIDTypeChange = (value) => {
        setIdType(value)
    }
    const onSpeciesChange = (value) => {
        setSpecies(value)
    }
    const onSearch = (value) => {
        if (value === ''){
            router.push({
                pathname: `/browser`,
            })
        }else {
            setSearching(true)
            router.push({
                pathname: `${UPLOAD_URL}`,
                query: {
                    idType: idType,
                    species: species,
                    geneName: value
                },
            })
            setSearching(false)
        }
    }
    return (
        <LayoutCustom>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body-stw" style={{padding:"15vh 2%",textAlign:"left"}}>
                <Row>
                    <Col xs={0} md={0} lg={4}>
                        <div style={
                            {
                                fontSize:"26px",
                            }
                        }>
                            Browse Gene
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={20}>
                        <Input.Group compact>
                            <Select defaultValue={props.species} style={{width:'10%'}} size={"large"} onChange={onSpeciesChange}>
                                <Option value="All">All</Option>
                                <Option value="Human">Human</Option>
                                <Option value="Mouse">Mouse</Option>
                            </Select>
                            <Select defaultValue={props.idType} style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                                <Option value="HGNC">HGNC Symbol</Option>
                                <Option value="Ensembl">Ensembl ID</Option>
                                <Option value="Entrez">Entrez ID</Option>
                            </Select>
                            <Search
                                placeholder={props.searchName}
                                id={"browser"}
                                allowClear
                                onSearch={onSearch}
                                size={"large"}
                                style={{
                                    width: "60vw",
                                    color: '#22075e',
                                }}
                                loading={searching}
                            />
                        </Input.Group>
                    </Col>
                </Row>
                <div >
                    <SearchResultTable data={props.data} />
                </div>

            </div>
        </LayoutCustom>
    )
}