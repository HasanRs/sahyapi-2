"use client";
import {Table as TableWrapper, Input, Empty} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {ReactNode, useEffect, useRef, useState} from "react";

export default function Table({
    data,
    header,
    columns,
    onSelectionChange,
    search = true,
    searchFields,
}: {
    data: any[],
    header?: ReactNode,
    columns: any[],
    onSelectionChange: (keys: any[], rows: any[]) => void,
    search?: boolean,
    searchFields?: string[],
}) {
    const [filteredData, setFilteredData] = useState<any[]>();
    const tableRef = useRef<any>();

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearch = (event: any) => {
        setFilteredData(data.filter((entry) => {
            return event.target.value.length === 0 ||
                (searchFields || columns.map(column => column.key))
                    .filter(Boolean)
                    .some(field => entry[field]?.toLowerCase().includes(event.target.value.toLowerCase()))
        }));
    }

    return (
        <div className="max-w-full space-y-4">
            {data.length === 0 ?
                <Empty description="Veri bulunamadı" /> : <>
                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        {header}
                    </div>
                    {search && <Input
                        allowClear
                        placeholder="Ara"
                        prefix={<SearchOutlined/>}
                        style={{width: 200}}
                        onChange={handleSearch}
                    />}
                </div>

                <TableWrapper
                    columns={columns}
                    dataSource={filteredData}
                    ref={tableRef}
                    pagination={{
                        showSizeChanger: true,
                        position: ['bottomLeft'],
                        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total} adet`,
                    }}
                    rowSelection={{
                        type: "checkbox",
                        onChange: onSelectionChange,
                    }}
                />
            </>}
        </div>
    );
}
