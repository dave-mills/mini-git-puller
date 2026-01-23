const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SCRIPT_PATH = process.env.SCRIPT_PATH || './script.sh';
const R_SCRIPT_PATH = process.env.R_SCRIPT_PATH || './r_script.sh';

// Endpoint to trigger the bash script
app.get('/pull', (req, res) => {
  const scriptFullPath = path.resolve(SCRIPT_PATH);

  console.log(`Executing script: ${scriptFullPath}`);

  exec(`bash ${scriptFullPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        stderr: stderr
      });
    }

    if (stderr) {
      console.warn(`Script stderr: ${stderr}`);
    }

    console.log(`Script output: ${stdout}`);

    res.json({
      success: true,
      output: stdout,
      stderr: stderr || null
    });
  });
});

app.post('/submission', (req, res) => {
  const scriptFullPath = path.resolve(R_SCRIPT_PATH);

  console.log(`Executing R script: ${scriptFullPath}`);

  exec(`Rscript ${scriptFullPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing R script: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        stderr: stderr
      });
    }

    if (stderr) {
      console.warn(`R script stderr: ${stderr}`);
    }

    console.log(`R script output: ${stdout}`);

    res.json({
      success: true,
      output: stdout,
      stderr: stderr || null
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Trigger script by visiting: http://localhost:${PORT}/pull`);
});
