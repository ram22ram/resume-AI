"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2, Check } from "lucide-react";
import { toast } from "sonner";

// Preset quick-add section titles for convenience
const PRESET_SECTIONS = [
  "Certifications",
  "Projects",
  "Achievements",
  "Hobbies & Interests",
  "Languages",
  "Publications",
  "Volunteering",
  "Awards",
];

export function CustomSectionsForm() {
  const {
    customSections,
    addCustomSection,
    updateCustomSectionTitle,
    addCustomSectionItem,
    updateCustomSectionItem,
    deleteCustomSectionItem,
    deleteCustomSection,
  } = useStore();

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState("");
  const [newItemValues, setNewItemValues] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddSection = (title: string) => {
    const t = title.trim();
    if (!t) return;
    // Prevent duplicate section titles
    if (customSections.some((s) => s.title.toLowerCase() === t.toLowerCase())) {
      toast.error(`A section named "${t}" already exists.`);
      return;
    }
    addCustomSection(t);
    setNewSectionTitle("");
    setShowPresets(false);
    // Auto-expand newly added section
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.add(`custom-${Date.now() - 1}`); // approximate — will expand on next render
      return next;
    });
    toast.success(`Section "${t}" added!`);
  };

  const handleSaveTitle = (id: string) => {
    const t = editingTitleValue.trim();
    if (!t) return;
    updateCustomSectionTitle(id, t);
    setEditingTitleId(null);
    toast.success("Section title updated");
  };

  const handleAddItem = (sectionId: string) => {
    const val = (newItemValues[sectionId] || "").trim();
    if (!val) return;
    addCustomSectionItem(sectionId, val);
    setNewItemValues((prev) => ({ ...prev, [sectionId]: "" }));
  };

  return (
    <div className="space-y-5">
      {/* Existing Custom Sections */}
      {customSections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        const isEditingTitle = editingTitleId === section.id;

        return (
          <div
            key={section.id}
            className="border border-border/60 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            {/* Section Header */}
            <div className="flex items-center gap-2 p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
              <GripVertical className="size-4 text-muted-foreground shrink-0" />

              {isEditingTitle ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Input
                    value={editingTitleValue}
                    onChange={(e) => setEditingTitleValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveTitle(section.id)}
                    className="h-8 text-sm font-bold rounded-xl"
                    autoFocus
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 shrink-0 text-green-600 hover:bg-green-50"
                    onClick={() => handleSaveTitle(section.id)}
                  >
                    <Check className="size-4" />
                  </Button>
                </div>
              ) : (
                <button
                  className="flex-1 min-w-0 text-left text-sm font-bold truncate"
                  onClick={() => toggleExpand(section.id)}
                >
                  {section.title}
                  <span className="ml-2 text-xs font-medium text-muted-foreground">
                    ({section.items.length} items)
                  </span>
                </button>
              )}

              <div className="flex items-center gap-1 shrink-0 ml-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  onClick={() => {
                    setEditingTitleId(section.id);
                    setEditingTitleValue(section.title);
                  }}
                  title="Rename section"
                >
                  <Edit2 className="size-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    if (confirm(`Delete "${section.title}" section?`)) {
                      deleteCustomSection(section.id);
                      toast.success("Section deleted");
                    }
                  }}
                  title="Delete section"
                >
                  <Trash2 className="size-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  onClick={() => toggleExpand(section.id)}
                >
                  {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </Button>
              </div>
            </div>

            {/* Section Items */}
            {isExpanded && (
              <div className="p-4 space-y-3 border-t border-border/40">
                {section.items.length === 0 && (
                  <p className="text-xs text-muted-foreground italic text-center py-2">
                    No items yet. Add one below.
                  </p>
                )}

                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateCustomSectionItem(section.id, idx, e.target.value)
                      }
                      className="h-9 text-sm rounded-xl flex-1"
                      placeholder={`${section.title} item`}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-9 shrink-0 text-destructive hover:bg-destructive/10"
                      onClick={() => deleteCustomSectionItem(section.id, idx)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}

                {/* Add Item Row */}
                <div className="flex items-center gap-2 pt-1">
                  <Input
                    value={newItemValues[section.id] || ""}
                    onChange={(e) =>
                      setNewItemValues((prev) => ({ ...prev, [section.id]: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleAddItem(section.id)}
                    placeholder={`Add ${section.title} item...`}
                    className="h-9 text-sm rounded-xl flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleAddItem(section.id)}
                    className="rounded-xl h-9 gap-1 px-4 text-xs font-bold shrink-0"
                  >
                    <Plus className="size-3.5" /> Add
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add New Section */}
      <div className="border-2 border-dashed border-border/60 rounded-2xl p-5 space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Add Custom Section
        </p>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESET_SECTIONS.filter(
            (p) => !customSections.some((s) => s.title.toLowerCase() === p.toLowerCase())
          ).map((preset) => (
            <button
              key={preset}
              onClick={() => handleAddSection(preset)}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-muted hover:bg-primary/10 hover:text-primary border border-border/60 transition-colors"
            >
              + {preset}
            </button>
          ))}
        </div>

        {/* Custom Title Input */}
        <div className="flex gap-2">
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSection(newSectionTitle)}
            placeholder="Section title (e.g. Publications, Awards...)"
            className="h-10 rounded-xl text-sm"
          />
          <Button
            onClick={() => handleAddSection(newSectionTitle)}
            disabled={!newSectionTitle.trim()}
            className="rounded-xl h-10 gap-2 px-5 font-bold shrink-0"
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
