# Portfolio Website Documentation

This documentation provides comprehensive instructions for setting up, running, and deploying the portfolio website. It covers local development, Docker containerization (including multi-architecture builds), and GitHub Pages deployment.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Multi-Architecture Docker Builds](#multi-architecture-docker-builds)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Troubleshooting](#troubleshooting)

## Local Development

### Prerequisites

- Web browser
- Optional: Local web server (like Python's built-in server or Node.js http-server)

### Running Locally

#### Method 1: Direct Browser Opening

The simplest way to view the website locally:

1. Navigate to the portfolio directory
2. Double-click on `index.html` to open it in your default web browser

This method works for basic viewing but may have limitations with certain JavaScript features that require a proper web server.

#### Method 2: Python HTTP Server

If you have Python installed:

```bash
# Navigate to the portfolio directory
cd /path/to/portfolio

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then open your browser and go to `http://localhost:8000`

#### Method 3: Node.js http-server

If you prefer Node.js:

```bash
# Install http-server globally if you haven't already
npm install -g http-server

# Navigate to the portfolio directory
cd /path/to/portfolio

# Start the server
http-server -p 8000
```

Then open your browser and go to `http://localhost:8000`

### Development Tips

- Use browser developer tools (F12 or Right-click > Inspect) to debug issues
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R) if changes aren't reflecting
- Test on multiple browsers to ensure compatibility

## Docker Deployment

### Prerequisites

- Docker installed on your system
- Docker Hub account (for pushing images)

### Basic Docker Deployment

#### Step 1: Create a Dockerfile

Create a file named `Dockerfile` in your portfolio directory:

```dockerfile
FROM nginx:alpine

# Copy the portfolio files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 2: Build the Docker Image

```bash
# Navigate to the portfolio directory
cd /path/to/portfolio

# Build the image
docker build -t portfolio:latest .
```

#### Step 3: Run the Docker Container

```bash
# Run the container, mapping port 8080 on the host to port 80 in the container
docker run -d -p 8080:80 --name my-portfolio portfolio:latest
```

#### Step 4: Access the Website

Open your browser and go to `http://localhost:8080`

#### Step 5: Push to Docker Hub (Optional)

```bash
# Log in to Docker Hub
docker login

# Tag the image with your Docker Hub username
docker tag portfolio:latest yourusername/portfolio:latest

# Push the image to Docker Hub
docker push yourusername/portfolio:latest
```

### Docker Compose Deployment

For a more manageable deployment, you can use Docker Compose:

#### Step 1: Create docker-compose.yml

Create a file named `docker-compose.yml` in your portfolio directory:

```yaml
version: '3'

services:
  portfolio:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

#### Step 2: Run with Docker Compose

```bash
# Start the service
docker-compose up -d

# Stop the service
docker-compose down
```

## Multi-Architecture Docker Builds

Building multi-architecture Docker images allows your container to run on different CPU architectures (AMD64/x86_64 and ARM64/aarch64), which is useful for compatibility across various systems including cloud providers and different CPU architectures like Intel/AMD and Apple Silicon.

### Prerequisites

- Docker Desktop installed (version 20.10.0 or higher)
- Docker Hub account
- Docker Buildx extension (included with recent Docker Desktop versions)

### Step 1: Set Up Docker Buildx

```bash
# Create a new builder instance with docker-container driver
docker buildx create --name multiarch-builder --driver docker-container --use

# Verify the builder is created and set as current
docker buildx ls
```

The output should show your new builder with an asterisk (*) indicating it's the active builder.

### Step 2: Bootstrap the Builder

```bash
# Initialize the builder with necessary components
docker buildx inspect --bootstrap
```

### Step 3: Build and Push Multi-Architecture Image

```bash
# Navigate to the portfolio directory
cd /path/to/portfolio

# Build for both AMD64 and ARM64 architectures and push to Docker Hub
docker buildx build --platform linux/amd64,linux/arm64 \
  -t yourusername/portfolio:latest \
  --push \
  .
```

Replace `yourusername` with your Docker Hub username.

### Step 4: Verify the Multi-Architecture Image

```bash
# Check that the image supports multiple architectures
docker manifest inspect yourusername/portfolio:latest
```

This will show the manifest list with both architectures, confirming that the image can run on different platforms.

### Advanced Buildx Options

#### Version Tagging

Add specific version tags in addition to `latest`:

```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  -t yourusername/portfolio:latest \
  -t yourusername/portfolio:v1.0 \
  --push \
  .
```

#### Build Caching

Use cache for faster builds:

```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  --cache-from type=registry,ref=yourusername/portfolio:buildcache \
  --cache-to type=registry,ref=yourusername/portfolio:buildcache,mode=max \
  -t yourusername/portfolio:latest \
  --push \
  .
```

### Troubleshooting Buildx Issues

#### Issue: Multi-platform build not supported

Error: `Multi-platform build is not supported for the docker driver`

Solution: Create a new builder with the docker-container driver as shown in Step 1.

#### Issue: Builder not running

If the builder shows as "inactive", bootstrap it:

```bash
docker buildx inspect multiarch-builder --bootstrap
```

#### Issue: Cross-platform emulation problems

Enable QEMU for cross-platform emulation:

```bash
docker run --privileged --rm tonistiigi/binfmt --install all
```

## GitHub Pages Deployment

GitHub Pages provides free hosting for static websites directly from a GitHub repository.

### Prerequisites

- GitHub account
- Git installed on your system
- Portfolio code pushed to a GitHub repository

### Step 1: Create and Push to GitHub Repository

```bash
# Navigate to the portfolio directory
cd /path/to/portfolio

# Initialize Git repository (if not already done)
git init

# Add all files to Git
git add .

# Commit the files
git commit -m "Initial commit of portfolio website"

# Create a GitHub repository (using GitHub CLI)
gh repo create portfolio-website --public

# Add the remote repository
git remote add origin https://github.com/yourusername/portfolio-website.git

# Push your code to GitHub
git push -u origin main
```

Replace `yourusername` with your GitHub username.

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository in a web browser
2. Click on "Settings" in the top navigation bar
3. Scroll down to the "GitHub Pages" section (or click on "Pages" in the left sidebar)
4. Under "Source", select the branch you want to deploy (usually "main" or "master")
5. Select the folder where your website files are located (usually "/ (root)")
6. Click "Save"

### Step 3: Access Your Published Website

After enabling GitHub Pages, GitHub will provide you with a URL where your site is published. The URL will be in the format:

```
https://yourusername.github.io/portfolio-website/
```

It may take a few minutes for your site to be published.

### Step 4: Configure Custom Domain (Optional)

1. In the GitHub Pages settings, enter your custom domain in the "Custom domain" field
2. Add the appropriate DNS records with your domain provider:
   - For apex domains (example.com): Add A records pointing to GitHub's IP addresses
   - For subdomains (www.example.com): Add a CNAME record pointing to yourusername.github.io
3. Check "Enforce HTTPS" for secure connections (recommended)

### Updating Your GitHub Pages Site

Any changes pushed to the selected branch will automatically update your site:

```bash
# Make changes to your files
# Then commit and push
git add .
git commit -m "Update website content"
git push
```

### Troubleshooting GitHub Pages

#### Issue: 404 Page Not Found

- Make sure your repository has an `index.html` file in the root or selected directory
- Verify that you've selected the correct branch and folder in the GitHub Pages settings
- Wait a few minutes as GitHub Pages deployment can take time

#### Issue: Missing Styles or Images

- Check that all file paths are correct
- For relative paths, make sure they account for the repository name in the URL
- Consider using relative paths that start with `/repository-name/` for assets

## Troubleshooting

### General Issues

#### Website Not Loading Properly

1. Check browser console for errors (F12 or Right-click > Inspect > Console)
2. Verify all file paths are correct
3. Ensure all required files are included
4. Clear browser cache and reload

#### Docker Container Not Starting

1. Check Docker logs: `docker logs my-portfolio`
2. Verify ports are not already in use
3. Ensure Docker service is running
4. Check for sufficient disk space

#### GitHub Pages Not Updating

1. Verify changes were pushed to the correct branch
2. Check repository settings to ensure GitHub Pages is configured correctly
3. Look for build errors in the GitHub Actions tab (if using GitHub Actions)
4. Wait a few minutes as deployments can take time to propagate

### Getting Help

If you encounter issues not covered in this documentation:

1. Check Docker and GitHub documentation
2. Search for specific error messages online
3. Ask questions on Stack Overflow or GitHub Discussions
4. Reach out to the developer community on forums or social media

## Conclusion

This documentation covers the essential steps for running the portfolio website locally, containerizing it with Docker (including multi-architecture builds), and deploying it to GitHub Pages. By following these instructions, you should be able to successfully develop, build, and deploy the portfolio website in various environments.