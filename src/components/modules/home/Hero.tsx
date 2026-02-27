"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Find Expert Tutors",
    subtitle: "Get personalized learning with top-rated instructors.",
  },
  {
    img: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Flexible Learning",
    subtitle: "Book sessions that fit your schedule.",
  },
  {
    img: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Professional Courses",
    subtitle: "Choose from dozens of professional courses.",
  },
  {
    img: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Expert Mentorship",
    subtitle: "Level up with mentorship and real-world guidance.",
  },
];

export function HeroCarousel() {
  return (
    <div className="w-full  mx-auto py-6 px-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="rounded-xl overflow-hidden shadow-2xl"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-112.5 w-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-center p-12 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-xl opacity-90 font-light max-lg drop-shadow">
                    {slide.subtitle}
                  </p>
                  <button className="mt-6 px-6 py-3  bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-all">
                    Get Started
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white border-none" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white border-none" />
      </Carousel>
    </div>
  );
}
