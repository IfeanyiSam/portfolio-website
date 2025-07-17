import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Samuel Nnanna</h1>
          <p className="text-md md:text-lg text-gray-600">DevOps Engineer | Cloud Infrastructure | CI/CD Automation</p>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/IfeanyiSam" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="https://www.linkedin.com/in/samuel-nnanna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="mailto:samuelnnanna71@gmail.com" aria-label="Email Me">
              <Mail className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </header>

        {/* Resume Download Section */}
        <section className="mb-8 md:mb-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Download My Resume</h2>
              <p className="text-gray-700 text-sm md:text-base">Get a copy of my detailed experience and skills</p>
            </div>
            <Button className="mt-3 md:mt-0 flex items-center gap-2" asChild>
              <a href="/resume.pdf" download aria-label="Download Resume">
                <Download className="h-4 w-4" />
                <span>Resume PDF</span>
              </a>
            </Button>
          </div>
        </section>

        <section className="mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700 text-sm md:text-base">
            I'm a versatile and results-driven DevOps Engineer with over 2 years of hands-on experience designing,
            automating, and managing scalable cloud infrastructure and CI/CD pipelines. I'm passionate about building
            secure and efficient systems that help teams deploy faster and scale with confidence.
          </p>
        </section>

        <section className="mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">What I Can Do</h2>
          <ul className="list-disc pl-6 space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base">
            <li>Design secure, scalable cloud infrastructure (AWS, GCP)</li>
            <li>Implement CI/CD pipelines using GitHub Actions, Jenkins, GitLab CI</li>
            <li>Automate infrastructure with Terraform and Helm</li>
            <li>Containerize and orchestrate applications using Docker, ECS, EKS, GKE</li>
            <li>Optimize cloud spend through architecture reviews and autoscaling</li>
            <li>Improve observability using Prometheus, Grafana, and EFK</li>
          </ul>
        </section>

        <section className="mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg md:text-xl font-bold">ENGIS</h3>
                <p className="text-gray-700 text-xs md:text-sm mb-2">DevOps Engineer (Contract)</p>
                <ul className="list-disc pl-5 text-gray-600 text-xs md:text-sm space-y-1">
                  <li>Deployed GitOps workflow using ArgoCD and Helm for Golang microservices</li>
                  <li>Provisioned EKS clusters with Terraform</li>
                  <li>Implemented Jenkins CI/CD and centralized logging with EFK</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg md:text-xl font-bold">AutomatedPros</h3>
                <p className="text-gray-700 text-xs md:text-sm mb-2">DevOps Engineer (Contract)</p>
                <ul className="list-disc pl-5 text-gray-600 text-xs md:text-sm space-y-1">
                  <li>Built scalable multi-region AWS infrastructure with Terraform</li>
                  <li>Implemented GitHub Actions CI/CD for Node.js and Angular apps</li>
                  <li>Enabled real-time monitoring with Prometheus and Grafana</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg md:text-xl font-bold">Bioconductor (Open Source)</h3>
                <p className="text-gray-700 text-xs md:text-sm mb-2">Open Science Contributor</p>
                <ul className="list-disc pl-5 text-gray-600 text-xs md:text-sm space-y-1">
                  <li>Provisioned GKE Autopilot clusters for research infrastructure</li>
                  <li>Integrated KEDA, Dagster, and Workload Identity Federation</li>
                  <li>Automated deployment using GitHub Actions and Terraform</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Let's Connect</h2>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            I'm actively looking for new DevOps opportunities and collaborations. Whether you're building an early-stage
            product or scaling an existing platform, I'd love to bring clarity, speed, and reliability to your workflows.
          </p>
          <Button asChild>
            <a href="mailto:samuelnnanna71@gmail.com">Get in Touch</a>
          </Button>
        </section>
      </div>
    </div>
  );
}