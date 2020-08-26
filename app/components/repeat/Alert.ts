const { dialog } = require('electron').remote;
// 헤더 컴포넌트
const Alert = async (pButtons: string[], pMessage: string, pTitle: string) => {
  const options = {
    buttons: pButtons,
    message: pMessage,
    title: pTitle
  };
  const resp = await dialog.showMessageBox(options);
  return resp.response;
};

export default Alert;
