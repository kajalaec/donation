
module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://kajalatci:kismatconnection@clusterdonation.1mkua.mongodb.net/?retryWrites=true&w=majority&appName=Clusterdonation',
  JWT_SECRET: process.env.JWT_SECRET || 'aa196c77-18a7-4816-a130-8f14ec897c25',
  PORT: process.env.PORT || 5000
};