
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  Check, 
  Save, 
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Lock
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

// Types for the form
interface ResumeForm {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    website?: string;
  };
  experience: JobExperience[];
  education: Education[];
  skills: string[];
  summary: string;
}

interface JobExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Mock initial data
const initialResumeData: ResumeForm = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: ""
  },
  experience: [
    {
      id: "exp-1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
  ],
  skills: [],
  summary: ""
};

// Premium subscription features
const premiumFeatures = [
  { name: "AI-Optimized Content Suggestions", description: "Get AI-powered content suggestions to improve your resume", isPremium: true },
  { name: "Keyword Optimization", description: "Automatically match your resume to job descriptions", isPremium: true },
  { name: "Unlimited Downloads", description: "Download your resume in multiple formats without limits", isPremium: true },
  { name: "Ad-Free Experience", description: "Enjoy using the resume builder without advertisements", isPremium: true },
  { name: "Custom Templates", description: "Access to premium professional templates", isPremium: true }
];

// Resume templates
const resumeTemplates = [
  { id: "modern", name: "Modern", isPremium: false },
  { id: "professional", name: "Professional", isPremium: false },
  { id: "creative", name: "Creative", isPremium: true },
  { id: "executive", name: "Executive", isPremium: true },
  { id: "minimal", name: "Minimal", isPremium: false }
];

const ResumeBuilderPage = () => {
  const [resume, setResume] = useState<ResumeForm>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isPremium, setIsPremium] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const form = useForm({
    defaultValues: initialResumeData.personalInfo
  });
  
  const handleGenerateResume = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent(`
        Based on your experience at ${resume.experience[0]?.company || 'your company'}, 
        I recommend highlighting your skills in ${resume.skills?.join(', ') || 'your field'}.
        
        Your education at ${resume.education[0]?.institution || 'your school'} 
        in ${resume.education[0]?.field || 'your field'} is a strong foundation.
        
        Consider adding quantifiable achievements to stand out to employers.
      `);
    }, 2000);
  };
  
  const handleDownloadResume = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    // In a real app, this would generate and download the PDF
    console.log("Downloading resume with template:", selectedTemplate);
    alert("Resume downloaded!");
  };
  
  const handleUpgradeClick = () => {
    // This would handle the payment flow in a real app
    setShowPremiumModal(false);
    setIsPremium(true);
    alert("Thank you for upgrading to premium! You now have access to all features.");
  };

  return (
    <Layout className="bg-background">
      <div className="pt-24 pb-8 md:pt-32 md:pb-12 bg-muted/30">
        <Container>
          <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Resume Builder</h1>
            <p className="text-muted-foreground">
              Create a professional resume in minutes with our AI-powered tools
            </p>
            
            {!isPremium && (
              <div className="p-3 bg-primary/10 text-primary rounded-lg mt-2 text-sm flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Free tier: 1 resume download per month</span>
                <Button size="sm" variant="default" className="ml-2" onClick={() => setShowPremiumModal(true)}>
                  Upgrade
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
      
      <section className="py-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-card rounded-lg border shadow-sm">
                <div className="p-4 border-b">
                  <TabsList className="grid grid-cols-5 gap-2">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="personal">
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                          <Input 
                            id="fullName" 
                            placeholder="John Doe" 
                            value={resume.personalInfo.fullName}
                            onChange={(e) => setResume({
                              ...resume,
                              personalInfo: {
                                ...resume.personalInfo,
                                fullName: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="john.doe@example.com"
                            value={resume.personalInfo.email}
                            onChange={(e) => setResume({
                              ...resume,
                              personalInfo: {
                                ...resume.personalInfo,
                                email: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                          <Input 
                            id="phone" 
                            placeholder="+44 123 456 7890"
                            value={resume.personalInfo.phone}
                            onChange={(e) => setResume({
                              ...resume,
                              personalInfo: {
                                ...resume.personalInfo,
                                phone: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="address" className="text-sm font-medium">Address</label>
                          <Input 
                            id="address" 
                            placeholder="London, UK"
                            value={resume.personalInfo.address}
                            onChange={(e) => setResume({
                              ...resume,
                              personalInfo: {
                                ...resume.personalInfo,
                                address: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn (Optional)</label>
                          <Input 
                            id="linkedin" 
                            placeholder="linkedin.com/in/johndoe"
                            value={resume.personalInfo.linkedin}
                            onChange={(e) => setResume({
                              ...resume,
                              personalInfo: {
                                ...resume.personalInfo,
                                linkedin: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="website" className="text-sm font-medium">Website (Optional)</label>
                          <Input 
                            id="website" 
                            placeholder="johndoe.com"
                            value={resume.personalInfo.website}
                            onChange={(e) => setResume({
                              ...resume,
                              personalInfo: {
                                ...resume.personalInfo,
                                website: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="summary">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Professional Summary</h3>
                        {isPremium && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={handleGenerateResume}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <FileText className="mr-2 h-4 w-4" />
                                AI Generate
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="summary" className="text-sm font-medium">Summary</label>
                        <Textarea 
                          id="summary"
                          placeholder="Write a professional summary that highlights your key qualifications and career goals."
                          className="min-h-[150px]"
                          value={resume.summary}
                          onChange={(e) => setResume({
                            ...resume,
                            summary: e.target.value
                          })}
                        />
                        <p className="text-xs text-muted-foreground">
                          A strong summary grabs employers' attention and highlights your value proposition.
                        </p>
                      </div>
                      
                      {generatedContent && (
                        <div className="mt-4 p-4 border rounded-md bg-primary/5">
                          <h4 className="text-sm font-medium mb-2">AI Suggestions</h4>
                          <p className="text-sm whitespace-pre-line">{generatedContent}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Work Experience</h3>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setResume({
                              ...resume,
                              experience: [
                                ...resume.experience,
                                {
                                  id: `exp-${resume.experience.length + 1}`,
                                  title: "",
                                  company: "",
                                  location: "",
                                  startDate: "",
                                  endDate: "",
                                  current: false,
                                  description: ""
                                }
                              ]
                            });
                          }}
                        >
                          Add Experience
                        </Button>
                      </div>
                      
                      {resume.experience.map((exp, index) => (
                        <div key={exp.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            {resume.experience.length > 1 && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-destructive"
                                onClick={() => {
                                  setResume({
                                    ...resume,
                                    experience: resume.experience.filter(e => e.id !== exp.id)
                                  });
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Job Title</label>
                              <Input 
                                placeholder="Software Developer" 
                                value={exp.title}
                                onChange={(e) => {
                                  const updatedExp = [...resume.experience];
                                  updatedExp[index].title = e.target.value;
                                  setResume({
                                    ...resume,
                                    experience: updatedExp
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Company</label>
                              <Input 
                                placeholder="Acme Inc." 
                                value={exp.company}
                                onChange={(e) => {
                                  const updatedExp = [...resume.experience];
                                  updatedExp[index].company = e.target.value;
                                  setResume({
                                    ...resume,
                                    experience: updatedExp
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Location</label>
                              <Input 
                                placeholder="London, UK" 
                                value={exp.location}
                                onChange={(e) => {
                                  const updatedExp = [...resume.experience];
                                  updatedExp[index].location = e.target.value;
                                  setResume({
                                    ...resume,
                                    experience: updatedExp
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Start Date</label>
                              <Input 
                                placeholder="Jan 2020" 
                                value={exp.startDate}
                                onChange={(e) => {
                                  const updatedExp = [...resume.experience];
                                  updatedExp[index].startDate = e.target.value;
                                  setResume({
                                    ...resume,
                                    experience: updatedExp
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">End Date</label>
                              <Input 
                                placeholder="Present" 
                                disabled={exp.current}
                                value={exp.endDate}
                                onChange={(e) => {
                                  const updatedExp = [...resume.experience];
                                  updatedExp[index].endDate = e.target.value;
                                  setResume({
                                    ...resume,
                                    experience: updatedExp
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) => {
                                  const updatedExp = [...resume.experience];
                                  updatedExp[index].current = e.target.checked;
                                  if (e.target.checked) {
                                    updatedExp[index].endDate = "Present";
                                  }
                                  setResume({
                                    ...resume,
                                    experience: updatedExp
                                  });
                                }}
                                className="rounded border-gray-300"
                              />
                              <label htmlFor={`current-${exp.id}`} className="text-sm font-medium">
                                I currently work here
                              </label>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea 
                              placeholder="Describe your responsibilities and achievements..." 
                              value={exp.description}
                              onChange={(e) => {
                                const updatedExp = [...resume.experience];
                                updatedExp[index].description = e.target.value;
                                setResume({
                                  ...resume,
                                  experience: updatedExp
                                });
                              }}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Education</h3>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setResume({
                              ...resume,
                              education: [
                                ...resume.education,
                                {
                                  id: `edu-${resume.education.length + 1}`,
                                  institution: "",
                                  degree: "",
                                  field: "",
                                  startDate: "",
                                  endDate: "",
                                  current: false,
                                  description: ""
                                }
                              ]
                            });
                          }}
                        >
                          Add Education
                        </Button>
                      </div>
                      
                      {resume.education.map((edu, index) => (
                        <div key={edu.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Education {index + 1}</h4>
                            {resume.education.length > 1 && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-destructive"
                                onClick={() => {
                                  setResume({
                                    ...resume,
                                    education: resume.education.filter(e => e.id !== edu.id)
                                  });
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Institution</label>
                              <Input 
                                placeholder="University of London" 
                                value={edu.institution}
                                onChange={(e) => {
                                  const updatedEdu = [...resume.education];
                                  updatedEdu[index].institution = e.target.value;
                                  setResume({
                                    ...resume,
                                    education: updatedEdu
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Degree</label>
                              <Input 
                                placeholder="Bachelor's" 
                                value={edu.degree}
                                onChange={(e) => {
                                  const updatedEdu = [...resume.education];
                                  updatedEdu[index].degree = e.target.value;
                                  setResume({
                                    ...resume,
                                    education: updatedEdu
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Field of Study</label>
                              <Input 
                                placeholder="Computer Science" 
                                value={edu.field}
                                onChange={(e) => {
                                  const updatedEdu = [...resume.education];
                                  updatedEdu[index].field = e.target.value;
                                  setResume({
                                    ...resume,
                                    education: updatedEdu
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Start Date</label>
                              <Input 
                                placeholder="Sep 2018" 
                                value={edu.startDate}
                                onChange={(e) => {
                                  const updatedEdu = [...resume.education];
                                  updatedEdu[index].startDate = e.target.value;
                                  setResume({
                                    ...resume,
                                    education: updatedEdu
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">End Date</label>
                              <Input 
                                placeholder="Jun 2022" 
                                disabled={edu.current}
                                value={edu.endDate}
                                onChange={(e) => {
                                  const updatedEdu = [...resume.education];
                                  updatedEdu[index].endDate = e.target.value;
                                  setResume({
                                    ...resume,
                                    education: updatedEdu
                                  });
                                }}
                              />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                id={`current-edu-${edu.id}`}
                                checked={edu.current}
                                onChange={(e) => {
                                  const updatedEdu = [...resume.education];
                                  updatedEdu[index].current = e.target.checked;
                                  if (e.target.checked) {
                                    updatedEdu[index].endDate = "Present";
                                  }
                                  setResume({
                                    ...resume,
                                    education: updatedEdu
                                  });
                                }}
                                className="rounded border-gray-300"
                              />
                              <label htmlFor={`current-edu-${edu.id}`} className="text-sm font-medium">
                                I'm currently studying here
                              </label>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <label className="text-sm font-medium">Description (Optional)</label>
                            <Textarea 
                              placeholder="Relevant coursework, achievements, activities..." 
                              value={edu.description}
                              onChange={(e) => {
                                const updatedEdu = [...resume.education];
                                updatedEdu[index].description = e.target.value;
                                setResume({
                                  ...resume,
                                  education: updatedEdu
                                });
                              }}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Skills</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Skills (comma separated)</label>
                        <Textarea 
                          placeholder="JavaScript, React, TypeScript, HTML, CSS, Node.js..."
                          className="min-h-[100px]"
                          value={resume.skills.join(", ")}
                          onChange={(e) => {
                            const skillsArray = e.target.value.split(",").map(skill => skill.trim()).filter(Boolean);
                            setResume({
                              ...resume,
                              skills: skillsArray
                            });
                          }}
                        />
                        <p className="text-xs text-muted-foreground">
                          Add relevant skills that match the job description you're applying for.
                        </p>
                      </div>
                      
                      {resume.skills.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Your Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {resume.skills.map((skill, index) => (
                              <div key={index} className="bg-secondary px-3 py-1 rounded-full text-xs flex items-center">
                                {skill}
                                <button 
                                  className="ml-2 text-muted-foreground hover:text-foreground"
                                  onClick={() => {
                                    setResume({
                                      ...resume,
                                      skills: resume.skills.filter((_, i) => i !== index)
                                    });
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium">Resume Preview</h3>
                <div className="bg-card rounded-lg border shadow-sm h-[600px] flex items-center justify-center">
                  {resume.personalInfo.fullName ? (
                    <div className="max-w-md mx-auto p-6 space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">{resume.personalInfo.fullName || "Your Name"}</h2>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
                          {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
                          {resume.personalInfo.address && <div>{resume.personalInfo.address}</div>}
                        </div>
                      </div>
                      
                      {resume.summary && (
                        <div>
                          <h3 className="font-medium text-primary border-b pb-1 mb-2">Summary</h3>
                          <p className="text-sm">{resume.summary}</p>
                        </div>
                      )}
                      
                      {resume.experience.some(exp => exp.company) && (
                        <div>
                          <h3 className="font-medium text-primary border-b pb-1 mb-2">Experience</h3>
                          <div className="space-y-3">
                            {resume.experience.filter(exp => exp.company).map((exp, index) => (
                              <div key={index} className="text-sm">
                                <div className="flex justify-between font-medium">
                                  <span>{exp.title}</span>
                                  <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div>{exp.company}, {exp.location}</div>
                                <p className="mt-1 text-xs text-muted-foreground">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {resume.education.some(edu => edu.institution) && (
                        <div>
                          <h3 className="font-medium text-primary border-b pb-1 mb-2">Education</h3>
                          <div className="space-y-3">
                            {resume.education.filter(edu => edu.institution).map((edu, index) => (
                              <div key={index} className="text-sm">
                                <div className="flex justify-between font-medium">
                                  <span>{edu.degree} in {edu.field}</span>
                                  <span>{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <div>{edu.institution}</div>
                                {edu.description && <p className="mt-1 text-xs text-muted-foreground">{edu.description}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {resume.skills.length > 0 && (
                        <div>
                          <h3 className="font-medium text-primary border-b pb-1 mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-1">
                            {resume.skills.map((skill, index) => (
                              <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                      <h3 className="text-lg font-medium">Your resume preview will appear here</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Fill out the form fields above to see your resume take shape.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => {
                    // Save the resume to local storage or state management
                    localStorage.setItem('resumeData', JSON.stringify(resume));
                    alert('Resume saved to your account!');
                  }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Resume
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleDownloadResume}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Templates</CardTitle>
                    <CardDescription>Choose your resume style</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {resumeTemplates.map(template => (
                      <div 
                        key={template.id} 
                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                          selectedTemplate === template.id ? 'bg-primary/10' : 'hover:bg-secondary'
                        } ${template.isPremium && !isPremium ? 'opacity-50' : ''}`}
                        onClick={() => {
                          if (template.isPremium && !isPremium) {
                            setShowPremiumModal(true);
                          } else {
                            setSelectedTemplate(template.id);
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          {selectedTemplate === template.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                          <span>{template.name}</span>
                        </div>
                        {template.isPremium && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            Premium
                          </span>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Premium Features</CardTitle>
                    <CardDescription>
                      Upgrade to access all premium features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          isPremium ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                          {isPremium ? (
                            <Check className="h-3 w-3 text-primary" />
                          ) : (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${!isPremium ? 'text-muted-foreground' : ''}`}>
                            {feature.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={isPremium ? "outline" : "default"}
                      onClick={() => !isPremium && setShowPremiumModal(true)}
                    >
                      {isPremium ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Premium Active
                        </>
                      ) : (
                        <>
                          <Award className="mr-2 h-4 w-4" />
                          Upgrade to Premium
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">Featured Job</h3>
                    <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Ad</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Marketing Assistant</p>
                    <p className="text-xs text-muted-foreground">London Digital Agency • £28,000-£32,000</p>
                    <Button size="sm" variant="secondary" className="w-full mt-2">View Job</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Premium Upgrade Modal - This would be a proper modal component in a real app */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPremiumModal(false)}
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Upgrade to Premium</h2>
              <p className="text-muted-foreground mt-2">
                Unlock all premium features for just £5/month
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Unlimited resume downloads</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>AI-powered content suggestions</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Keyword optimization for job listings</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Premium resume templates</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Ad-free experience</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full" onClick={handleUpgradeClick}>
                Upgrade Now - £5/month
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowPremiumModal(false)}>
                Not Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ResumeBuilderPage;
