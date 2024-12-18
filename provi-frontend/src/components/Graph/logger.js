

export const logEvent = (activity, uiGroup, value) => {
  const logData = {
    activity,
    uiGroup,
    value: JSON.stringify(value), // Convert value to string
    timestamp: new Date().toISOString(),
  };

  console.log(logData);

 
  fetch('http://localhost:5000/api/log', { 
    method: 'POST',
    body: JSON.stringify(logData),
    headers: { 'Content-Type': 'application/json' },
  }).catch((error) => console.error('Error logging event:', error));
};