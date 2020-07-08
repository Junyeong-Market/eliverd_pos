const { dialog } = require('electron').remote;
// 헤더 컴포넌트
const Alert = (pButtons: string[], pMessage: string, pTitle: string) => {
  const options = {
    buttons: pButtons,
    message: pMessage,
    title: pTitle
  };
  console.log('실행');
  dialog.showMessageBox(options);
};

export default Alert;
