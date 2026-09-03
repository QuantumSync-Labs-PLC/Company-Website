import Carousel from "@/components/ui/Carousel";
import { Star } from "lucide-react";

export default function TestimonialCarousel({ testimonials = [] }) {
  if (!testimonials.length) return null;

  const slides = testimonials.map((testimonial, idx) => (
    <div key={idx} className="flex flex-col items-center justify-center text-center px-4 py-8">
      {/* Stars */}
      <div className="flex gap-1 mb-5 justify-center">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <Star key={i} size={20} className="fill-qs-signal text-qs-signal" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-qs-text italic text-lg sm:text-xl font-body mb-6 max-w-xl leading-relaxed">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 justify-center">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover border border-qs-primary"
          />
        )}
        <div className="text-left">
          <p className="font-headline font-bold text-qs-text text-base">
            {testimonial.author}
          </p>
          <p className="text-qs-text-section text-sm">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <Carousel
      slides={slides}
      autoPlay={true}
      interval={5000}
      className="border-qs-accent/30 bg-qs-surface/50"
    />
  );
}
