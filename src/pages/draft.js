// TẠO COLUMNS
// export const columns = [
//   {
//       field: 'index',
//       maxWidth: 170,
//       name: 'STT',
//       align: 'center',
//   },
//   {
//       field: 'name',
//       maxWidth: 170,
//       name: 'Name Program',
//   },

//   {
//       field: 'target',
//       maxWidth: 170,
//       name: 'Target',
//   },

//   {
//       field: 'actions',
//       maxWidth: 170,
//       name: 'Actions',
//       align: 'center',
//   },
// ];

// =================================

// PARSE DATA

// const parseData = useCallback((item, field, index) => {
//   if (field === 'index') {
//       return index + 1;
//   }
//   if (field === 'target') {
//       const formatNumber = item[field].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//       return `${formatNumber} $`;
//   }
//   if (field === 'isClosed') {
//       if (!item.isClosed) {
//           return <div className="text-success font-weight-bold">Starting</div>;
//       }

//       return <div className="text-danger font-weight-bold">Closed</div>;
//   }

//   if (field === 'actions') {
//       return (
//           <div className="d-flex justify-content-center">
//               <Link
//                   passHref
//                   href={{
//                       pathname: '/program/program-detail',
//                       query: { ...item, type: 'not' },
//                   }}
//               >
//                   <Button>a</Button>
//               </Link>

//               <Button>b</Button>
//           </div>
//       );
//   }

//   return item[field];
// }, []);

// ==========================

// const fakeData = [
//   {
//       name: 'A',
//       target: 1000,
//   },
// ];

// <TableCommon
// data={fakeData || []}
// columns={columns}
// parseFunction={parseData}
// isShowPaging
// //   onChangePage={page => onChangePage(page - 1)}
// //   totalCountData={(dataList && dataList.total) || 0}
// //   defaultPage={dataRequest.page + 1}
// //   currentPage={dataRequest.page + 1}
// //   totalDisplay={dataRequest.size || 10}
// classNameTable="tblCampaignReport"
// />
