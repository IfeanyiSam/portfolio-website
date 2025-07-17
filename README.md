# Samuel Nnanna - DevOps Engineer Portfolio

A responsive, modern portfolio website showcasing my DevOps engineering skills and experience.

## Features

- Responsive design for all devices
- Interactive UI elements with animations
- Contact form for potential employers
- Downloadable resume
- Skill badges and project showcase
- Testimonials section

## Running Locally

### Option 1: Without Docker

Simply open the `index.html` file in your browser, or use a local server:

```bash
# Using Python's built-in HTTP server
python3 -m http.server 8000
```

### Option 2: With Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t portfolio .
docker run -p 8000:80 portfolio
```

The site will be available at http://localhost:8000

## Deployment Options

- **GitHub Pages**: Free and easy to set up
- **Netlify**: Free tier with custom domain support
- **Vercel**: Great for static sites with excellent performance
- **AWS S3 + CloudFront**: Low-cost option with global CDN
- **Docker**: Deploy the containerized version to any hosting platform

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx

## Contact

Feel free to reach out to me at samuelnnanna71@gmail.com or connect on [LinkedIn](https://www.linkedin.com/in/samuel-nnanna).