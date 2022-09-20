import {Breadcrumb} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";

export default function HelpAnnotation() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Example Usage</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Annotation</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}