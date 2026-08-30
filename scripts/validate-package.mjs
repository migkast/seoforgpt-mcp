import { access, readFile } from 'node:fs/promises'

const jsonFiles = [
  'plugin.json',
  'mcp.json',
  '.cursor-plugin/plugin.json',
  '.grok-plugin/plugin.json',
  '.mcp.json',
  'server.json',
  'glama.json',
]

const requiredFiles = [
  'LICENSE',
  'README.md',
  'assets/seoforgpt-logo.png',
  'skills/seoforgpt-brand-visibility/SKILL.md',
  'skills/seoforgpt-agency-visibility/SKILL.md',
]

const parsed = new Map()

for (const path of jsonFiles) {
  parsed.set(path, JSON.parse(await readFile(path, 'utf8')))
}

for (const path of requiredFiles) {
  await access(path)
}

const endpoint = 'https://www.seoforgpt.io/mcp'
const agentServer = parsed.get('mcp.json').mcpServers?.seoforgpt
const grokServer = parsed.get('.mcp.json').mcpServers?.seoforgpt
const registryServer = parsed.get('server.json').remotes?.[0]

if (agentServer?.type !== 'streamable-http' || agentServer.url !== endpoint) {
  throw new Error('mcp.json must use the hosted streamable HTTP endpoint')
}

if (grokServer?.type !== 'http' || grokServer.url !== endpoint) {
  throw new Error('.mcp.json must use the hosted Grok HTTP endpoint')
}

if (registryServer?.type !== 'streamable-http' || registryServer.url !== endpoint) {
  throw new Error('server.json must use the hosted streamable HTTP endpoint')
}

for (const manifest of [
  parsed.get('plugin.json'),
  parsed.get('.cursor-plugin/plugin.json'),
  parsed.get('.grok-plugin/plugin.json'),
]) {
  if (manifest.name !== 'seoforgpt' || manifest.version !== '1.1.0') {
    throw new Error('Plugin manifests must use the expected name and version')
  }
}

console.log('SEOforGPT plugin package is internally consistent')
