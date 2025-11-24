"use client"

import { useState } from "react"
import Image from "next/image"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, LifeBuoy, Video, Download, ExternalLink } from "lucide-react"

const HELP_GUIDES = [
  {
    title: "Trainee User Guide",
    description: "Navigate the portal, access modules, and review your personalized progress path.",
    icon: "📚",
    pdfUrl: "/guides/trainee-user-guide.pdf",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Trainer User Guide",
    description: "Create content, assign tasks, and support cohorts with coaching tips.",
    icon: "👨‍🏫",
    pdfUrl: "/guides/trainer-user-guide.pdf",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "DPD/RPDC Staff Guide",
    description: "Monitor district rollouts, manage staff accounts, and export reports.",
    icon: "📊",
    pdfUrl: "/guides/dpd-rpdc-staff-guide.pdf",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "EMIS Admin Guide",
    description: "Configure roles, maintain infrastructure, and respond to support escalations.",
    icon: "⚙️",
    pdfUrl: "/guides/emis-admin-guide.pdf",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

const FAQS = [
  {
    q: "How do I reset my password?",
    a: "Contact your EMIS administrator. Demo accounts use email-only authentication, so no password is needed.",
  },
  {
    q: "Can I download completed modules?",
    a: "Yes, your progress page offers PDF and video downloads for modules you've completed.",
  },
  {
    q: "Where do I find certificates?",
    a: "Certificates unlock after finishing a phase. Head to My Progress → Achievements to download.",
  },
  {
    q: "Which browsers are supported?",
    a: "Chrome, Firefox, Edge, and Safari on desktop. Use a screen resolution of 1280px+ for best results.",
  },
  {
    q: "How do I report bugs or missing content?",
    a: "Open the Feedback center, pick “Bug report” with high priority, and describe the issue in detail.",
  },
  {
    q: "Is offline learning supported?",
    a: "Many videos include an offline toggle. Download them while online to view later in low-connectivity areas.",
  },
]

export default function HelpPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [isPdfOpen, setIsPdfOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const handleViewPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl)
    setIsPdfOpen(true)
  }

  const handleDownloadPdf = (pdfUrl: string) => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = pdfUrl.split("/").pop() || "guide.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleWatchVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl)
    setIsVideoOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-10 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <section className="rounded-3xl bg-linear-to-r from-[#1f2abb] via-[#5f3df7] to-[#a855f7] p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">Help center</p>
              <h1 className="text-3xl font-semibold tracking-tight">Guides & manuals</h1>
              <p className="mt-2 text-sm opacity-90">One-stop knowledge base for trainees, trainers, and administrators.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <Badge className="rounded-full bg-white/20 text-white backdrop-blur">PDFs & Checklists</Badge>
                <Badge className="rounded-full bg-white/20 text-white backdrop-blur">Walkthrough Videos</Badge>
                <Badge className="rounded-full bg-white/20 text-white backdrop-blur">Live office hours</Badge>
              </div>
            </div>
            <div className="relative h-44 w-64 overflow-hidden rounded-3xl bg-white/10 shadow-lg">
              <Image src="/placeholder-user.jpg" alt="Help center collage" fill className="object-cover opacity-90" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Role-based playbooks</CardTitle>
              <p className="text-sm text-slate-500">Downloadable PDFs and video walkthroughs by role.</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {HELP_GUIDES.map((guide) => (
                <div key={guide.title} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{guide.icon}</span>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{guide.title}</p>
                      <p className="text-xs text-slate-500">{guide.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="rounded-full px-3 text-xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                      onClick={() => handleViewPdf(guide.pdfUrl)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-full px-3 text-xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                      onClick={() => handleWatchVideo(guide.videoUrl)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Watch video
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Need quick guidance?</CardTitle>
                <p className="text-sm text-slate-500">Bookmark these cheat sheets for everyday workflows.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Weekly onboarding checklist", desc: "Step-by-step reminder to orient new teachers." },
                  { title: "Trainer facilitation kit", desc: "Icebreakers, rubric templates, and feedback forms." },
                  { title: "DPD monitoring dashboard", desc: "How to interpret charts and export reports." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                    <p className="text-base font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-indigo-200">Live support</p>
                <CardTitle className="text-2xl">Office hours</CardTitle>
                <p className="text-sm text-indigo-100">Join the Thursday drop-in call for real-time help.</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-indigo-100">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-white">Schedule</p>
                  <p className="text-xs text-indigo-200">Every Thursday · 3:00–4:00 PM PKT</p>
                </div>
                <Button className="w-full rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white">
                  Save a seat
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Frequently asked questions</CardTitle>
              <p className="text-sm text-slate-500">Updated weekly with the latest guidance.</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {FAQS.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4">
                    <AccordionTrigger className="text-left text-sm font-semibold text-slate-900">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Still need help?</CardTitle>
              <p className="text-sm text-slate-500">Contact the support desk.</p>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-base font-semibold text-slate-900">Email support</p>
                <p className="text-xs text-slate-500">support@kpk-training.edu.pk</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-base font-semibold text-slate-900">Office hours</p>
                <p className="text-xs text-slate-500">Mon–Fri · 9:00 AM – 5:00 PM</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-base font-semibold text-slate-900">Response time</p>
                <p className="text-xs text-slate-500">Within 24 business hours</p>
              </div>
              <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-4 text-sm text-slate-700">
                <p className="text-base font-semibold text-slate-900">Emergency hotline</p>
                <p className="text-xs text-slate-500">+92 91 1234567 · DPD command center</p>
              </div>
              <Button
                onClick={() => window.open("mailto:support@kpk-training.edu.pk", "_blank")}
                className="w-full rounded-2xl bg-[#5f3df7] text-white hover:bg-[#4b2ed4]"
              >
                Email support team
              </Button>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-xs text-slate-500">
                <LifeBuoy className="h-4 w-4 text-indigo-400" />
                Need immediate technical support? Jump into the Feedback page to log a high-priority ticket.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PDF Viewer Dialog */}
        <Dialog open={isPdfOpen} onOpenChange={setIsPdfOpen}>
          <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 rounded-3xl bg-white shadow-xl border-0">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200 bg-slate-50 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  {HELP_GUIDES.find(g => g.pdfUrl === selectedPdf)?.title || "PDF Viewer"}
                </DialogTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                    onClick={() => selectedPdf && handleDownloadPdf(selectedPdf)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                    onClick={() => selectedPdf && window.open(selectedPdf, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in new tab
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="h-[calc(90vh-100px)] overflow-hidden bg-slate-100">
              {selectedPdf ? (
                <iframe
                  src={`${selectedPdf}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-sm">No PDF selected</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Player Dialog */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 rounded-3xl bg-white shadow-xl border-0">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200 bg-slate-50 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  {HELP_GUIDES.find(g => g.videoUrl === selectedVideo)?.title || "Video Player"}
                </DialogTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                    onClick={() => selectedVideo && window.open(selectedVideo, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in new tab
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="relative w-full bg-black rounded-b-3xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {selectedVideo ? (
                <iframe
                  src={selectedVideo}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video Player"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center">
                    <Video className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-sm text-white">No video selected</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
