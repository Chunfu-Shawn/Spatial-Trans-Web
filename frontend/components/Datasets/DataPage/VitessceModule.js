import React, {Suspense, useState} from 'react';
import {Col, Row, Select} from "antd";
import { LoadingOutlined,SelectOutlined } from '@ant-design/icons';
const { Option } = Select;

const Vitessce = React.lazy(() => import('./VitessceWrapper.js'));


export default function VitessceVisualization(props) {
    let viewConfigTemp = {...props.config}
    props.duplicateOption[0] === "null"?
        viewConfigTemp.datasets[0].files.forEach( file => {
            if (file.url !== undefined) file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}.zarr`
            else file.options.images[0].url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}.zarr/uns/spatial/V1_Human_Lymph_Node/images/hires`
        }):
        viewConfigTemp.datasets[0].files.forEach( file => {
            if (file.url !== undefined) file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${props.duplicateOption[0]}.zarr`
            else file.options.images[0].url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${props.duplicateOption[0]}.zarr/uns/spatial/V1_Human_Lymph_Node/images/hires`
        })
    const height = 600
    const [viewConfig, setViewConfig] = useState(viewConfigTemp);
    const onChangeDuplicate =(value)=>{
        let viewConfigTemp = {...viewConfig}
        viewConfigTemp.datasets[0].files.forEach( file => {
            if (file.url !== undefined) file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${value}.zarr`
            else file.options.images[0].url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${value}.zarr/uns/spatial/V1_Human_Lymph_Node/images/hires`
            console.log(file)
        })
        setViewConfig(viewConfigTemp)
    }
    return (
        <>
        <Row justify="start" align="stretch">
            <Col span={6}><span style={{fontSize:"16px"}}>Anndata-Zarr ID (Duplicates): </span></Col>
            <Col span={6}>
                <Select
                    defaultValue={props.duplicateOption[0]}
                    style={{
                        width: '15vw',
                    }}
                    onChange={onChangeDuplicate}
                >
                    {props.duplicateOption.map(item =>
                            <Option key={item} value={item}>{item}</Option>
                        )
                    }
                </Select>
            </Col>
        </Row><br/>
        <div className="panel-visual" style={{height:height+2+"px"}}>
            <Suspense fallback={
                <LoadingOutlined spin={true} style={{marginTop:"20%",fontSize:"30px"}}/>
            }
            >
                <Vitessce
                    config={viewConfig}
                    height={height}
                    theme="dark"
                />
            </Suspense>
        </div>
            <p style={{float:'right',color:"gray"}}>Powered by <a target={"__blank"} href={"https://vitessce.io/"}>Vitessce <SelectOutlined /></a></p>
        </>
    )
}