import {Table} from "antd";
import React from "react";
const data = [
    {
        "Attribution": "Symbol",
        "Description": "official short-form abbreviation for a particular gene"
    },
    {
        "Attribution": "Entrez ID",
        "Description": "identifier for a gene per the NCBI Entrez database"
    },
    {
        "Attribution": "Description",
        "Description": "a descriptive name for this gene, and those words inside the square brackets show the source of this attribution"
    },
    {
        "Attribution": "Gene Type",
        "Description": <span>a gene classification containing <b>protein coding, lncRNA, processed pseudogene, unprocessed pseudogene,
        miRNA, TEC, snRNA, misc_RNA, snoRNA and so on</b>, which integrated from Ensembl Database</span>
    },
    {
        "Attribution": "Organism",
        "Description": "organism from which a gene came, containing only two species: Homo sapiens and Mus musculus"
    },
    {
        "Attribution": "Gene Synonyms",
        "Description": "a comma-delimited set of unofficial symbols and descriptions that have been used for this gene integrated from NCBI Entrez Database"
    },
    {
        "Attribution": "Other Designations",
        "Description": "semicolon-delimited set of some alternate descriptions that have been assigned to a GeneID. '-' indicates none is being reported."
    },
    {
        "Attribution": "Identifiers in Other DB",
        "Description": <span>comma-delimited set of identifiers in other databases for this gene.
            The unit of the set is database:value. Note that HGNC and MGI include 'HGNC' and 'MGI', respectively, in the value part of their identifier.
            Consequently, this attribution for these databases will appear like: <b>HGNC:HGNC:1100</b>, this would be interpreted as database='HGNC', value='HGNC:1100'.
            Example for MGI: <b>MGI:MGI:104537</b>. This would be interpreted as database='MGI', value='MGI:104537'.</span>
    },
    {
        "Attribution": "Gene Version",
        "Description": "gene version integrated from Ensembl Database"
    },
    {
        "Attribution": "Gene Source",
        "Description": "the annotation source for this gene integrated from Ensembl Database"
    },
]
const columns =[
    {
        title: 'Attribution',
        dataIndex: 'Attribution',
        key: 'Attribution',
        width: '6%',
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        width:'30%',
    }
]

export default function GeneInfoAttributionsTable(){
    return(
        <Table dataSource={
            data.map( item => {
                return { key:item.Attribution,...item}
            })
        } columns={columns} size={"small"} bordered={true} pagination={false}/>
    )
}