/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable spaced-comment */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { typesColumn } from './constants.js';

const TableCommon = (props) => {
    const {
        columns, //type of array - required -- cấu hình của các cột
        data, //type of array - required -- data của bảng
        primaryKey, // key chính của data
        parseFunction, //type of function -- function để parse / tùy chỉnh hiển thị data
        sortFunction, // function custom sort
        actionsHeaderTable, // action ở phí dưới table
        actionsFooterTable, // action ở phí dưới table
        classNameTable, // class để style cho table
        isShowPaging = false, // check có hiển thị paging hay không
        onChangePage, // xử lý mỗi khi thay đổi page return về page được chọn\
        onSort, // xử lý khi thay đổi sort , dùng trong trường hợp call api
        defaultPage = 1, // page default hiển thị
        currentPage = 1, // page hiện tại
        totalDisplay = 20, // tổng số bản ghi trên 1 trang
        totalCountData = 0, // tổng tất cả bản ghi
        iterablePaging, // các config còn lại của paging ant design //  https://ant.design/components/table
        isShowCheckbox = false, //type og bool -- điều kiện hiển thị nút select
        checkBoxType = 'checkbox', // loại select checkbox || radio
        onSelect, // gọi khi chọn bản ghi
        defaultSelected,
        iterableSelection, // các config còn lại của selection ant design //  https://ant.design/components/table
        isRemoveSelected = false, // nếu === true sẽ remove selected
        isCheckedAll = false, // check có phải là chọn tất cả không  --- boolean
        checkItemHasSelect, //  check với mỗi item thì có được chọn hay không --- bool
        renderSubItem, // render sub table
        iterableExpand, // các config còn lại của paging trong antd
        expandCondition, // check điều kiện để expand
        ...iterableProps
    } = props;

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (defaultSelected && defaultSelected.length > 0) {
            const newSelected = defaultSelected.map((item, index) => ({
                ...item,
                key: primaryKey && item[primaryKey] ? item[primaryKey] : `${index}`,
            }));
            setSelected(newSelected);
        }
    }, []);

    useEffect(() => {
        if (isRemoveSelected) {
            setSelected([]);
        }
    }, [isRemoveSelected]);

    useEffect(() => {
        if (isCheckedAll) {
            setSelected(getData());
        }
    }, [isCheckedAll]);

    const handleChangePage = (page, pageSize) => {
        if (page === currentPage) {
            return;
        }
        onChangePage(page, pageSize);
    };

    const compareFloat = (a, b) => {
        if (parseFloat(b) < parseFloat(a)) return -1;
        if (parseFloat(b) > parseFloat(a)) return 1;

        return 0;
    };

    const descendingComparator = (item1, item2, config) => {
        if (config.type && config.type === typesColumn.number) {
            return compareFloat(item1[config.field], item2[config.field]);
        }
        if (item2[config.field] < item1[config.field]) {
            return -1;
        }
        if (item2[config.field] > item1[config.field]) {
            return 1;
        }

        return 0;
    };

    const getSortConfig = (item) => {
        // nếu có onSort thì sẽ sort ở api
        if (item.isSort && !sortFunction && !onSort) {
            return {
                sortDirections: ['ascend', 'descend'],
                showSorterTooltip: false,
                sorter: (a, b) => descendingComparator(a, b, item),
            };
        }
        if (item.isSort && sortFunction && !onSort) {
            return {
                sortDirections: ['ascend', 'descend'], // default sort
                showSorterTooltip: false,
                sorter: (a, b) =>
                    sortFunction(a, b, item, (item1, item2, config) => descendingComparator(item1, item2, config)),
            };
        }

        return {};
    };

    // convert config hiện tại sang config table antd
    const getColumns = () =>
        columns.map((item) => ({
            ...item,
            title: item.name,
            dataIndex: item.field,
            key: item.field,
            width: item.width,
            render: (text, record, index) => {
                if (parseFunction) {
                    return parseFunction(
                        record,
                        item.field,
                        isShowPaging ? (currentPage - 1) * totalDisplay + index : index,
                    );
                }

                return <span>{text}</span>;
            },
            ...getSortConfig(item),
        }));

    // thêm key vào mỗi item để phù hợp với dataSource
    const getData = () =>
        data &&
        data?.length > 0 &&
        data?.map((item, index) => ({
            ...item,
            key: primaryKey && item[primaryKey] ? item[primaryKey] : `${index}`,
        }));

    // console.log('props', props);
    // console.log('selected', selected);
    // console.log('getData()', getData());

    // loại bỏ key trước khi gửi lại
    const removeKeyInData = (dataSelected) =>
        dataSelected.map((item) => {
            const { key, ...newData } = item;

            return newData;
        });

    // config của select box
    const getSelectConfig = () => {
        if (isShowCheckbox) {
            return {
                ...iterableSelection,
                type: checkBoxType,
                onChange: (selectedRowKeys, selectedRows, info) => {
                    // console.log('selectedRowKeys', selectedRowKeys);
                    // console.log('selectedRows', selectedRows);
                    // console.log('info', info);
                    setSelected(selectedRows);
                    onSelect(removeKeyInData(selectedRows), info.type);
                },
                selectedRowKeys: selected.map((item) => item.key),
                checkStrictly: false,
                getCheckboxProps: (record) => ({
                    disabled: checkItemHasSelect ? checkItemHasSelect(record) : false,
                    name: record.account,
                }),
            };
        }

        return false;
    };

    // config của phân trang
    const getPaginationConfig = () => {
        if (isShowPaging) {
            return {
                ...iterablePaging,
                current: currentPage,
                defaultCurrent: defaultPage,
                pageSize: totalDisplay,
                pageSizeOptions: [10, 20, 50, 100],
                total: totalCountData,
                onChange: (page, pageSize) => handleChangePage(page, pageSize),
            };
        }

        return false;
    };

    // example data https://ant.design/components/table/#components-table-demo-tree-data
    const getExpandableConfig = () => ({
        ...iterableExpand,
        expandedRowRender: renderSubItem
            ? (record, index, indent, expanded) => renderSubItem(record, index, indent, expanded)
            : null,
        rowExpandable: expandCondition ? (record) => expandCondition(record) : null,
    });

    // const handleChangeSortFilter = (newPagination, filters, sorter) => onSort(sorter)

    return (
        <div className="root">
            <Table
                columns={getColumns()}
                dataSource={getData()}
                rowSelection={getSelectConfig()}
                pagination={getPaginationConfig()}
                title={actionsHeaderTable ? () => actionsHeaderTable() : null}
                footer={actionsFooterTable ? () => actionsFooterTable() : null}
                expandable={getExpandableConfig()}
                rowKey={primaryKey}
                className={classNameTable}
                {...iterableProps}

                // onChange={handleChangeSortFilter}
            />
        </div>
    );
};

export default TableCommon;
