'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Upload,
  Info,
  AlertTriangle,
  Lightbulb,
  FileText,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { weaknessCategories } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ReportSubmissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  programAssets: string[]
}

const severityOptions = [
  { value: 'critical', label: 'Critical', description: 'Complete system compromise, data breach' },
  { value: 'high', label: 'High', description: 'Significant security impact' },
  { value: 'medium', label: 'Medium', description: 'Moderate security concern' },
  { value: 'low', label: 'Low', description: 'Minor security issue' },
  { value: 'informational', label: 'Informational', description: 'Security observation' },
]

const steps = [
  { id: 1, title: 'Basic Info', description: 'Vulnerability details' },
  { id: 2, title: 'Technical Details', description: 'Steps & proof' },
  { id: 3, title: 'Impact & Review', description: 'Final review' },
]

const reportingTips = [
  'Include clear, reproducible steps',
  'Provide screenshots or videos as proof',
  'Describe the actual vs expected behavior',
  'Explain the security impact',
  'Suggest a remediation if possible',
]

export function ReportSubmissionModal({
  open,
  onOpenChange,
  programName,
  programAssets,
}: ReportSubmissionModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    asset: '',
    severity: '',
    weaknessType: '',
    summary: '',
    stepsToReproduce: '',
    proofOfConcept: '',
    impact: '',
    remediation: '',
    cvssScore: '',
    agreeToRules: false,
  })

  const [attachments, setAttachments] = useState<string[]>([])

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setIsSubmitted(false)
    setFormData({
      title: '',
      asset: '',
      severity: '',
      weaknessType: '',
      summary: '',
      stepsToReproduce: '',
      proofOfConcept: '',
      impact: '',
      remediation: '',
      cvssScore: '',
      agreeToRules: false,
    })
    setAttachments([])
    onOpenChange(false)
  }

  const canProceedStep1 =
    formData.title && formData.asset && formData.severity && formData.weaknessType
  const canProceedStep2 = formData.summary && formData.stepsToReproduce
  const canSubmit = canProceedStep2 && formData.impact && formData.agreeToRules

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Report Submitted!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Thank you for your submission. This is a demo, so no actual report was created.
              In production, you would receive a confirmation email and tracking ID.
            </p>
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 max-w-sm mx-auto">
              <p className="text-sm text-muted-foreground">Demo Report ID</p>
              <p className="font-mono text-foreground">HTB-2026-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            </div>
            <Badge variant="outline" className="mb-6">Hackathon Demo</Badge>
            <div>
              <Button onClick={handleClose}>Close</Button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row h-full">
            {/* Main Form */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <DialogHeader className="p-6 pb-4 border-b border-border">
                <DialogTitle className="text-xl">Submit Vulnerability Report</DialogTitle>
                <DialogDescription>
                  Report a security vulnerability to {programName}
                </DialogDescription>
              </DialogHeader>

              {/* Steps Indicator */}
              <div className="px-6 py-4 border-b border-border bg-secondary/30">
                <div className="flex items-center justify-between max-w-md">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex items-center">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                            currentStep === step.id
                              ? 'bg-primary text-primary-foreground'
                              : currentStep > step.id
                              ? 'bg-success text-success-foreground'
                              : 'bg-secondary text-muted-foreground'
                          )}
                        >
                          {currentStep > step.id ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="ml-2 hidden sm:block">
                          <p className="text-xs font-medium text-foreground">{step.title}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            'h-0.5 w-8 mx-2 sm:w-12',
                            currentStep > step.id ? 'bg-success' : 'bg-border'
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="title">Vulnerability Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., SQL Injection in Login API"
                          value={formData.title}
                          onChange={(e) => updateFormData('title', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="asset">Affected Asset / Target *</Label>
                        <Select
                          value={formData.asset}
                          onValueChange={(value) => updateFormData('asset', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an asset" />
                          </SelectTrigger>
                          <SelectContent>
                            {programAssets.map((asset) => (
                              <SelectItem key={asset} value={asset}>
                                {asset}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Severity *</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {severityOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => updateFormData('severity', option.value)}
                              className={cn(
                                'p-3 rounded-lg border text-left transition-colors',
                                formData.severity === option.value
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                              )}
                            >
                              <p className="font-medium text-foreground text-sm">{option.label}</p>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weakness">Weakness Type / Category *</Label>
                        <Select
                          value={formData.weaknessType}
                          onValueChange={(value) => updateFormData('weaknessType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select weakness type" />
                          </SelectTrigger>
                          <SelectContent>
                            {weaknessCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Technical Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="summary">Summary *</Label>
                        <Textarea
                          id="summary"
                          placeholder="Provide a brief summary of the vulnerability..."
                          rows={3}
                          value={formData.summary}
                          onChange={(e) => updateFormData('summary', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="steps">Steps to Reproduce *</Label>
                        <Textarea
                          id="steps"
                          placeholder="1. Navigate to...&#10;2. Enter the following payload...&#10;3. Observe that..."
                          rows={5}
                          value={formData.stepsToReproduce}
                          onChange={(e) => updateFormData('stepsToReproduce', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="poc">Proof of Concept</Label>
                        <Textarea
                          id="poc"
                          placeholder="Include code snippets, payloads, or technical details..."
                          rows={4}
                          className="font-mono text-sm"
                          value={formData.proofOfConcept}
                          onChange={(e) => updateFormData('proofOfConcept', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Attachments</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Drop files here or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, MP4, PDF up to 10MB
                          </p>
                          <p className="text-xs text-primary mt-2">(Demo: Upload simulated)</p>
                        </div>
                        {attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {attachments.map((file, index) => (
                              <Badge key={index} variant="secondary" className="gap-1">
                                {file}
                                <button onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}>
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Impact & Review */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="impact">Security Impact *</Label>
                        <Textarea
                          id="impact"
                          placeholder="Describe the potential security impact and affected users/data..."
                          rows={4}
                          value={formData.impact}
                          onChange={(e) => updateFormData('impact', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="remediation">Suggested Remediation</Label>
                        <Textarea
                          id="remediation"
                          placeholder="Suggest how this vulnerability could be fixed..."
                          rows={3}
                          value={formData.remediation}
                          onChange={(e) => updateFormData('remediation', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvss">CVSS Score (Optional)</Label>
                        <Input
                          id="cvss"
                          placeholder="e.g., 8.5"
                          value={formData.cvssScore}
                          onChange={(e) => updateFormData('cvssScore', e.target.value)}
                          className="max-w-32"
                        />
                      </div>

                      {/* Summary Preview */}
                      <div className="rounded-lg border border-border bg-secondary/30 p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Report Summary
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Title</p>
                            <p className="text-foreground">{formData.title || '-'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Asset</p>
                            <p className="text-foreground">{formData.asset || '-'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Severity</p>
                            <p className="text-foreground capitalize">{formData.severity || '-'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Weakness</p>
                            <p className="text-foreground">{formData.weaknessType || '-'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Agreement */}
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                        <Checkbox
                          id="agree"
                          checked={formData.agreeToRules}
                          onCheckedChange={(checked) =>
                            updateFormData('agreeToRules', checked as boolean)
                          }
                        />
                        <div className="space-y-1">
                          <Label htmlFor="agree" className="text-sm font-medium cursor-pointer">
                            I confirm this report follows the program rules *
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            I have tested responsibly, followed the scope guidelines, and have not
                            accessed unauthorized data.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
                        <Info className="h-4 w-4 text-warning shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          This is a demo submission. No actual report will be created.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="p-6 pt-4 border-t border-border flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={handleClose}>
                    Cancel
                  </Button>
                  {currentStep < 3 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={
                        (currentStep === 1 && !canProceedStep1) ||
                        (currentStep === 2 && !canProceedStep2)
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!canSubmit || isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Tips */}
            <div className="hidden lg:block w-72 border-l border-border bg-secondary/30 p-6">
              <div className="sticky top-0">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-4 w-4 text-warning" />
                  <h3 className="font-medium text-foreground">Reporting Tips</h3>
                </div>
                <ul className="space-y-3">
                  {reportingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Before submitting</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ensure your report is complete and follows the program&apos;s scope guidelines.
                      </p>
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="mt-6">
                  Demo Mode
                </Badge>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
