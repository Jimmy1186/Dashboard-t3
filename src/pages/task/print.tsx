import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function Print() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <button onClick={()=>handleClickOpen()}>asdasdssss</button>
     <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose}>
      <DialogContent>
        <table className="printTable">
          <tbody>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={4}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={7}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={5}>das</td>
              <td colSpan={2}>das</td>
              
              <td colSpan={3}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={1}>das</td>

              <td colSpan={4}>das</td>
              <td colSpan={4}>das</td>
              <td colSpan={2}>das</td>


              <td colSpan={6}>das</td>
              <td colSpan={7}>das</td>
            </tr>
            <tr>
              <td colSpan={3}>das</td>
              <td colSpan={14}>das</td>
              <td colSpan={4}>das</td>
              
              <td colSpan={4}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={13}>das</td>

             
            </tr>

            <tr>
              <td colSpan={5}>das</td>
              <td colSpan={12}>das</td>
              <td colSpan={8}>das</td>
              
              <td colSpan={13}>das</td>
              <td colSpan={7}>das</td>
            </tr>

            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            <tr>
              <td colSpan={7}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>

              <td colSpan={1}>das</td>
              <td colSpan={6}>das</td>
              <td colSpan={3}>das</td>
              <td colSpan={7}>das</td>
              <td colSpan={6}>das</td>
            </tr>
            
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
    </>
   
  );
}

export default Print;
