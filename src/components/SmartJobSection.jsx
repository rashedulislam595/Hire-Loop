"use client";

import { useState } from "react";
import { HiOutlineLocationMarker, HiArrowRight } from "react-icons/hi";
import { BsBriefcase } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    description:
      "Build next-generation interfaces that push the boundaries of what's possible on the web.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hr",
    tag: "Hot",
    tagColor: "#ff4d4d",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    description:
      "Shape user experiences that balance beauty and function across our core product suite.",
    location: "Berlin, Germany",
    type: "Remote",
    salary: "€30–€50/hr",
    tag: "New",
    tagColor: "#7c3aed",
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Infrastructure",
    description:
      "Architect scalable systems and APIs that power millions of users daily.",
    location: "London, UK",
    type: "On-site",
    salary: "€35–€55/hr",
    tag: "Featured",
    tagColor: "#0ea5e9",
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Analytics",
    description:
      "Extract insights from complex datasets to drive strategic product decisions.",
    location: "Toronto, CA",
    type: "Hybrid",
    salary: "€40–€65/hr",
    tag: "Urgent",
    tagColor: "#f59e0b",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Platform",
    description:
      "Build and maintain CI/CD pipelines, cloud infrastructure, and deployment workflows.",
    location: "Amsterdam, NL",
    type: "Remote",
    salary: "€35–€50/hr",
    tag: "New",
    tagColor: "#7c3aed",
  },
  {
    id: 6,
    title: "Growth Marketer",
    department: "Marketing",
    description:
      "Drive acquisition and retention through data-informed, creative campaigns.",
    location: "Paris, France",
    type: "Hybrid",
    salary: "€20–€35/hr",
    tag: "Hot",
    tagColor: "#ff4d4d",
  },
];

function JobCard({ job, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, #0f0f13 0%, #13101e 100%)"
          : "#0a0a0d",
        border: hovered ? "1px solid rgba(124,58,237,0.5)" : "1px solid #1a1a1f",
        borderRadius: "20px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        boxShadow: hovered
          ? "0 20px 60px rgba(124,58,237,0.12), 0 0 0 1px rgba(124,58,237,0.15)"
          : "0 2px 20px rgba(0,0,0,0.3)",
        animationDelay: `${index * 80}ms`,
        animation: "fadeSlideUp 0.6s ease both",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "160px",
            height: "160px",
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />
      )}

      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))",
            border: "1px solid rgba(124,58,237,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BsBriefcase size={18} color="#a78bfa" />
        </div>

        {/* Tag */}
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: job.tagColor,
            background: `${job.tagColor}18`,
            border: `1px solid ${job.tagColor}40`,
            borderRadius: "999px",
            padding: "3px 10px",
          }}
        >
          {job.tag}
        </span>
      </div>

      {/* Department */}
      <p
        style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6b7280",
          marginBottom: "6px",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {job.department}
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#f0eeff",
          marginBottom: "10px",
          lineHeight: "1.3",
          fontFamily: "'Syne', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {job.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13.5px",
          color: "#6b7280",
          lineHeight: "1.75",
          marginBottom: "20px",
          flex: 1,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {job.description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #1e1e26, transparent)",
          marginBottom: "18px",
        }}
      />

      {/* Meta chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "22px" }}>
        {[
          { icon: <HiOutlineLocationMarker size={13} />, label: job.location },
          { icon: <BsBriefcase size={12} />, label: job.type },
          { icon: <RiMoneyDollarCircleLine size={14} />, label: job.salary },
        ].map((chip, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#9ca3af",
              background: "#111116",
              border: "1px solid #1e1e26",
              borderRadius: "999px",
              padding: "4px 12px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span style={{ color: "#7c3aed" }}>{chip.icon}</span>
            {chip.label}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          fontWeight: 600,
          color: hovered ? "#a78bfa" : "#6b7280",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          transition: "all 0.25s ease",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.01em",
        }}
      >
        Apply Now
        <span
          style={{
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.25s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HiArrowRight size={15} />
        </span>
      </button>
    </div>
  );
}

export default function SmartJobSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.4; }
          50%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }

        .job-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .job-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .job-grid { grid-template-columns: 1fr; }
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:hover { transform: translateY(-2px) !important; }
        .cta-btn:active { transform: translateY(0px) !important; }
      `}</style>

      <section
        style={{
          background: "#06060a",
          minHeight: "100vh",
          padding: "120px 24px",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background noise texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

        {/* Top ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

          {/* Label pill */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "28px",
              animation: "fadeSlideUp 0.5s ease both",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "999px",
                padding: "6px 18px",
              }}
            >
              <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#7c3aed",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#7c3aed",
                    animation: "pulse-ring 2s ease infinite",
                    opacity: 0.5,
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#9d7af5",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Smart Job Discovery
              </span>
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "72px",
              animation: "fadeSlideUp 0.55s 0.08s ease both",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#f0eeff",
                fontFamily: "'Syne', sans-serif",
                marginBottom: "18px",
              }}
            >
              Roles you never found
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                by searching.
              </span>
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#4b5563",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Our AI surfaces high-fit opportunities tailored to your skills — before anyone else sees them.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="job-grid">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
              animation: "fadeSlideUp 0.6s 0.5s ease both",
            }}
          >
            <button
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.01em",
                padding: "14px 32px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              View all open positions
              <HiArrowRight size={16} />
            </button>
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              marginTop: "56px",
              paddingTop: "40px",
              borderTop: "1px solid #111116",
              flexWrap: "wrap",
              animation: "fadeSlideUp 0.6s 0.6s ease both",
            }}
          >
            {[
              { value: "2,400+", label: "Active Listings" },
              { value: "94%", label: "Match Accuracy" },
              { value: "18k+", label: "Hired This Year" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#f0eeff",
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#4b5563",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}