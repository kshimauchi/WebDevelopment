// (1)fake implementation of nats stream server
export const natsWrapper = {
    client: {
      publish: (subject: string, data: string, callback: () => void) => {
        callback();
      },
    },
  };
  