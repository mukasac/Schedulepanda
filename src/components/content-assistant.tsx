'use client'

import * as React from "react"
import { Plus, Sparkles } from "lucide-react"
import { 
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle 
} from "./ui/card"
import { Button } from "./ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "./ui/select"
import { CONTENT_TEMPLATES } from "@/lib/constants"

interface ContentAssistantProps {
  platform: string
  onSuggest: (content: string) => void
}

type TemplateCategory = keyof typeof CONTENT_TEMPLATES

export function ContentAssistant({ platform, onSuggest }: ContentAssistantProps) {
  const [category, setCategory] = React.useState<TemplateCategory>("marketing")

  return (
    <UICard>
      <UICardHeader className="pb-2">
        <UICardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Content Suggestions
        </UICardTitle>
      </UICardHeader>
      <UICardContent>
        <div className="space-y-4">
          <Select
            value={category}
            onValueChange={(value: TemplateCategory) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketing">Marketing Templates</SelectItem>
              <SelectItem value="engagement">Engagement Boosters</SelectItem>
              <SelectItem value="promotional">Promotional Content</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-2 gap-2">
            {CONTENT_TEMPLATES[category].map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="default"
                className="h-auto py-2 justify-start text-left"
                onClick={() => onSuggest(template)}
              >
                <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">{template}</span>
              </Button>
            ))}
          </div>
        </div>
      </UICardContent>
    </UICard>
  )
}