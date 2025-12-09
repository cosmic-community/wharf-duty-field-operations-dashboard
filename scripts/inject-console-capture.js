const fs = require('fs');
const path = require('path');

const buildDir = path.join(process.cwd(), '.next/server/app');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('/dashboard-console-capture.js')) {
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Injected console capture script into ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to inject script into ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(buildDir)) {
  processDirectory(buildDir);
  console.log('Console capture script injection complete');
} else {
  console.log('Build directory not found - skipping script injection');
}