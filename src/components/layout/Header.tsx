import Link from "next/link"
import React from "react"

export function Header() {
  return (
    <header>
      <h1>Currency Exchange</h1>
      <Link href="/">Home</Link>
      <Link href="/currency-converter">Currency Converter</Link>
    </header>
  )
}