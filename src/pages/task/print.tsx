import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


import { GetServerSideProps } from 'next'
import { trpc } from "../../utils/trpc";

// let workbook= new ExcelJs.Workbook()
// let nameFileExcel = '../publuc/01.xlsx'
// workbook.xlsx.readFile(nameFileExcel)
// .then(function()  {
//   var worksheet = workbook.getWorksheet(2);
//   var lastRow = worksheet.lastRow;
//   var getRowInsert = worksheet.getRow(1);
//   getRowInsert.getCell('A').value = 'yo';
//   getRowInsert.commit();
//   return workbook.xlsx.writeFile(nameFileExcel);
// });


// await wb.xlsx.readFile(filePath).then(function()  {
// 	var worksheet = wb.getWorksheet(2);
// 	var lastRow = worksheet.lastRow;
// 	var getRowInsert = worksheet.getRow(++(lastRow.number));
// 	getRowInsert.getCell('A').value = 'yo';
// 	getRowInsert.commit();
// 	return wb.xlsx.writeFile(filePath);
// });

function Print() {

  const xlsxMutation = trpc.useMutation(['guest.xlsx'])

  const onDownload = React.useCallback(()=>{
    xlsxMutation.mutate({
      id:"test"
    })
  },[xlsxMutation])
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    onDownload()
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <button onClick={()=>handleClickOpen()}>asdasdssss</button>
     <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose}>
      <DialogContent>
     
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
    </>
   
  );
}

export default Print;


// export const getServerSideProps: GetServerSideProps = async (context) => {

//   workbook.xlsx.readFile(nameFileExcel)
//   .then(function()  {
//     var worksheet = workbook.getWorksheet(2);
//     var lastRow = worksheet.lastRow;
//     var getRowInsert = worksheet.getRow(1);
//     getRowInsert.getCell('A').value = 'yo';
//     getRowInsert.commit();
//     return workbook.xlsx.writeFile(nameFileExcel);
//   });




//   return {
//     props:{
//       data:"sad"
//     }
//   }
// }
