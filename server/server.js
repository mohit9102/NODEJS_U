// Importing required modules
const http = require("http"); // To create an HTTP server
const fs = require("fs"); // To interact with the file system
const path = require("path"); // To work with file and directory paths

// Define the port number for the server to listen on
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {

   
  // Determine the file path based on the requested URL
  const filePath = path.join(
    __dirname, // Current directory
    req.url === "/" ? "index.html" : req.url // Serve 'index.html' for the root URL, otherwise serve the requested file
  );
  console.log(filePath); // Log the file path for debugging




  // Get the file extension to determine the MIME type
  const extName = String(path.extname(filePath)).toLowerCase();



  // Define supported MIME types
  const mimeTypes = {
    ".html": "text/html", // HTML files
    ".css": "text/css", // CSS files
    ".js": "text/javascript", // JavaScript files
    ".png": "text/png", // PNG images
  };

  // Get the content type based on the file extension
  const contentType = mimeTypes[extName] || "application/octet-stream"; // Default to binary data for unsupported types




  // Read the requested file from the file system
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle file not found errors
      if (err.code === "ENOENT") {//ENOENT: Error No Entry,means:- file not found

        res.writeHead(404, { "Content-Type": "text/html" }); // Set 404 status and Content-Type header

        res.end("404: File Not Found BRooooo"); // Send error message to the client

      } else {
        // Handle other errors

        res.writeHead(500); // Internal server error

        res.end("500: Internal Server Error");
      }

    } else {
      // Successfully found and read the file
      
      //header part of the response
      res.writeHead(200, { "Content-Type": contentType }); // Set 200 status and the correct Content-Type

      //body part of the response
      res.end(content, "utf-8"); // Send the file content to the client
    }
  });
});





// Start the server and listen for requests
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`); // Log server status
});

