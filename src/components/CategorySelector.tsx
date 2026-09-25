import React, { useState } from 'react';
import { Category, CategoryId } from '../types/campus';
import { CATEGORIES_DATA, DEPARTMENTS_DATA, INFRASTRUCTURE_AREAS } from '../data/campusData';
import { 
  BookOpen, Building, Users, Utensils, Laptop, Trophy, HelpCircle, 
  ChevronRight, ArrowLeft, Check, Sparkles
} from 'lucide-react';

interface CategorySelectorProps {
  onSelectCategory: (categoryId: CategoryId, subSelection?: { departmentId?: string; infraAreaId?: string }) => void;
  onOpenDecisionTree: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategory,
  onOpenDecisionTree,
}) => {
  const [selectedCatId, setSelectedCatId] = useState<CategoryId | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(DEPARTMENTS_DATA[0].id);
  const [selectedInfraAreaId, setSelectedInfraAreaId] = useState<string>(INFRASTRUCTURE_AREAS[0].id);

  const activeCategory = CATEGORIES_DATA.find(c => c.id === selectedCatId);

  const renderCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'ACADEMICS': return <BookOpen className="w-6 h-6 text-slate-950" />;
      case 'INFRASTRUCTURE': return <Building className="w-6 h-6 text-slate-950" />;
      case 'STUDENT_SSG': return <Users className="w-6 h-6 text-slate-950" />;
      case 'CANTEEN': return <Utensils className="w-6 h-6 text-slate-950" />;
      case 'DEPARTMENT': return <Laptop className="w-6 h-6 text-slate-950" />;
      case 'CLUBS_ACTIVITIES': return <Trophy className="w-6 h-6 text-slate-950" />;
      case 'SOMETHING_ELSE': return <HelpCircle className="w-6 h-6 text-slate-950" />;
    }
  };

  const getCategoryBgColor = (id: CategoryId) => {
    switch (id) {
      case 'ACADEMICS': return 'bg-sky-200 hover:bg-sky-300';
      case 'INFRASTRUCTURE': return 'bg-emerald-200 hover:bg-emerald-300';
      case 'STUDENT_SSG': return 'bg-amber-200 hover:bg-amber-300';
      case 'CANTEEN': return 'bg-rose-200 hover:bg-rose-300';
      case 'DEPARTMENT': return 'bg-purple-200 hover:bg-purple-300';
      case 'CLUBS_ACTIVITIES': return 'bg-cyan-200 hover:bg-cyan-300';
      case 'SOMETHING_ELSE': return 'bg-slate-200 hover:bg-slate-300';
    }
  };

  const handleCardClick = (cat: Category) => {
    if (cat.id === 'SOMETHING_ELSE') {
      onOpenDecisionTree();
      return;
    }

    if (cat.requiresSubtype) {
      setSelectedCatId(cat.id);
    } else {
      onSelectCategory(cat.id);
    }
  };

  const handleConfirmSubSelection = () => {
    if (!selectedCatId) return;
    if (selectedCatId === 'DEPARTMENT') {
      onSelectCategory('DEPARTMENT', { departmentId: selectedDeptId });
    } else if (selectedCatId === 'INFRASTRUCTURE') {
      onSelectCategory('INFRASTRUCTURE', { infraAreaId: selectedInfraAreaId });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Step Indicator Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-300 border-2 border-slate-900 text-slate-950 text-xs font-mono font-black uppercase tracking-wider mb-3 shadow-sm">
          <span>STEP 1 OF 3</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          WHAT BRINGS YOU HERE?
        </h2>
        <p className="text-slate-700 text-sm sm:text-base font-bold max-w-xl mx-auto mt-2">
          Pick your concern category and we'll point you to the exact HITAM office room!
        </p>
      </div>

      {/* Sub-selection view for Department or Infrastructure */}
      {selectedCatId && activeCategory ? (
        <div className="bg-white border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-cartoon animate-fadeIn max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedCatId(null)}
            className="flex items-center gap-2 text-xs font-black text-slate-700 hover:text-slate-950 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-amber-300 border-2 border-slate-900">
              {renderCategoryIcon(selectedCatId)}
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{activeCategory.title}</h3>
              <p className="text-xs font-bold text-slate-600">{activeCategory.description}</p>
            </div>
          </div>

          {/* Department Branch Selector */}
          {selectedCatId === 'DEPARTMENT' && (
            <div className="space-y-4">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
                Select Your Department / Branch:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEPARTMENTS_DATA.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`p-4 rounded-2xl border-2 border-slate-900 cursor-pointer transition-all flex items-center justify-between ${
                      selectedDeptId === dept.id
                        ? 'bg-purple-300 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-50 text-slate-800 hover:bg-purple-100 font-bold'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black">{dept.code}</div>
                      <div className="text-xs text-slate-700">{dept.name}</div>
                    </div>
                    {selectedDeptId === dept.id && (
                      <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Infrastructure Area Selector */}
          {selectedCatId === 'INFRASTRUCTURE' && (
            <div className="space-y-4">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
                Which physical area does your concern involve?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INFRASTRUCTURE_AREAS.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSelectedInfraAreaId(area.id)}
                    className={`p-4 rounded-2xl border-2 border-slate-900 cursor-pointer transition-all flex items-center justify-between ${
                      selectedInfraAreaId === area.id
                        ? 'bg-emerald-300 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-50 text-slate-800 hover:bg-emerald-100 font-bold'
                    }`}
                  >
                    <span className="text-xs font-bold">{area.name}</span>
                    {selectedInfraAreaId === area.id && (
                      <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleConfirmSubSelection}
              className="cartoony-btn-emerald px-6 py-3 rounded-xl text-sm flex items-center gap-2"
            >
              <span>CONFIRM DESTINATION</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Category Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat)}
              className={`group border-3 border-slate-900 rounded-3xl p-6 transition-all duration-200 cursor-pointer shadow-cartoon hover:shadow-cartoon-hover hover:-translate-y-1 flex flex-col justify-between ${getCategoryBgColor(cat.id)}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white border-2 border-slate-900 shadow-sm group-hover:scale-110 transition-transform">
                    {renderCategoryIcon(cat.id)}
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t-2 border-slate-900/20 flex items-center justify-between text-xs font-black text-slate-950">
                <span>Select & Walk</span>
                <span className="font-mono">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
