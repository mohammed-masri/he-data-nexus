
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Digital Sharjah color scheme
				'ds-primary': '#338546',
				'ds-primary-dark': '#1E6435',
				'ds-secondary': '#DBF0E1',
				'ds-bg': '#FAFAF8',
				'ds-bg-grey': '#F8F9FA',
				'ds-bg-grey-light': '#FCFCFD',
				'ds-bg-grey-medium': '#F1F3F4',
				'ds-border': '#E5E5DE',
				'ds-border-grey': '#E8EAED',
				'ds-text-primary': '#2C332F',
				'ds-text-secondary': '#565E59',
				'ds-text-muted': '#808683',
				// New supporting colors for active interface
				'active-blue': {
					50: '#eff6ff',
					100: '#dbeafe',
					500: '#3b82f6',
					600: '#2563eb',
				},
				'active-purple': {
					50: '#faf5ff',
					100: '#f3e8ff',
					500: '#8b5cf6',
					600: '#7c3aed',
				},
				'active-orange': {
					50: '#fff7ed',
					100: '#ffedd5',
					500: '#f97316',
					600: '#ea580c',
				},
				'active-teal': {
					50: '#f0fdfa',
					100: '#ccfbf1',
					500: '#14b8a6',
					600: '#0d9488',
				},
				'active-indigo': {
					50: '#eef2ff',
					100: '#e0e7ff',
					500: '#6366f1',
					600: '#5b21b6',
				},
				'active-rose': {
					50: '#fff1f2',
					100: '#ffe4e6',
					500: '#f43f5e',
					600: '#e11d48',
				},
				// Status colors
				'status-success': {
					50: '#f0fdf4',
					100: '#dcfce7',
					500: '#22c55e',
					600: '#16a34a',
				},
				'status-warning': {
					50: '#fffbeb',
					100: '#fef3c7',
					500: '#f59e0b',
					600: '#d97706',
				},
				'status-info': {
					50: '#eff6ff',
					100: '#dbeafe',
					500: '#3b82f6',
					600: '#2563eb',
				},
				'status-error': {
					50: '#fef2f2',
					100: '#fecaca',
					500: '#ef4444',
					600: '#dc2626',
				},
				// Enhanced green and grey colors
				'green-primary': 'hsl(var(--green-primary))',
				'green-secondary': 'hsl(var(--green-secondary))',
				'grey-light': 'hsl(var(--grey-light))',
				'grey-medium': 'hsl(var(--grey-medium))',
				'grey-dark': 'hsl(var(--grey-dark))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
