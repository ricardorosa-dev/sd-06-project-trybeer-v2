const applicationJsonContent = 'application/json';

const sendMessage = async (user, time, message, to) => {
  const sendMessages = await fetch('http://localhost:4001/chat', {
    method: 'POST',
    headers: {
      'Content-Type': applicationJsonContent,
    },
    body: JSON.stringify({ user, time, message, to }),
  });
  // const sendMsg = await sendMessages.json();
  return sendMessages;
};

module.exports = {
  sendMessage,
};
