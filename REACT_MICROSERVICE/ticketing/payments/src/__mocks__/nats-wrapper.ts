export const natsWrapper = {
  //base listener, subject, data and a callback
  //base listener is Shared Repo also @ticket-share/common
  client: {
      publish: jest
        .fn()
        .mockImplementation(
          (subject: string, data: string, callback: () => void)=> {
            callback();
          }
        ),
    },
};
/* 
(subject: string, data: string, callback: () => void) => {
      callback(); */
