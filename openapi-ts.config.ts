const config = {
  input: "http://localhost:3006/api-json",
  output: "./src/app/api",
  client: "axios",
  primitiveTypes: { file: "Blob" },
   plugins: [
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: './src/lib/hey-api.ts', 
    },
  ],
};

export default config;
