const fs = require('fs');
const path = require('path');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\KIIT0001\\.gemini\\antigravity-ide\\brain\\d9dcdca0-bdfc-48e7-8acc-4b0cd284b528\\.system_generated\\logs\\transcript_full.jsonl';
const workspacePath = 'C:\\Users\\KIIT0001\\.gemini\\antigravity-ide\\scratch\\vedant-portfolio';

// We want to recover the state of files BEFORE the minimalist theme. 
// The minimalist theme started around timestamp: "2026-07-11T14:35:00Z" (when we viewed personal.json).
// Actually, it's safer to just look at the last time the file was modified BEFORE the minimalist plan.
// But some files were completely deleted by the minimalist plan. So we just need the LAST known state from write/replace tool calls where the content matches the cyberpunk style.

// We will maintain a simulated file system state.
const fileState = new Map();

async function processTranscript() {
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const step = JSON.parse(line);
            
            // Only care about PLANNER_RESPONSE (where tool calls are made)
            if (step.type === 'PLANNER_RESPONSE' && step.tool_calls) {
                for (const call of step.tool_calls) {
                    if (call.name === 'default_api:write_to_file') {
                        const args = call.arguments;
                        if (args && args.TargetFile && args.CodeContent) {
                            fileState.set(args.TargetFile, args.CodeContent);
                        }
                    } else if (call.name === 'default_api:replace_file_content') {
                        const args = call.arguments;
                        if (args && args.TargetFile) {
                            let content = fileState.get(args.TargetFile);
                            if (content) {
                                // Simple string replacement for now
                                // This is a bit naive for line-based replacement but might work if we have the exact TargetContent
                                if (args.TargetContent && args.ReplacementContent) {
                                    // Handle windows line endings vs unix
                                    const targetRegex = new RegExp(escapeRegExp(args.TargetContent.replace(/\\r\\n/g, '\\n')), 'g');
                                    content = content.replace(/\\r\\n/g, '\\n').replace(targetRegex, args.ReplacementContent.replace(/\\r\\n/g, '\\n'));
                                    fileState.set(args.TargetFile, content);
                                }
                            }
                        }
                    } else if (call.name === 'default_api:multi_replace_file_content') {
                         const args = call.arguments;
                         if (args && args.TargetFile && args.ReplacementChunks) {
                             let content = fileState.get(args.TargetFile);
                             if (content) {
                                 for (const chunk of args.ReplacementChunks) {
                                     const targetRegex = new RegExp(escapeRegExp(chunk.TargetContent.replace(/\\r\\n/g, '\\n')), 'g');
                                     content = content.replace(/\\r\\n/g, '\\n').replace(targetRegex, chunk.ReplacementContent.replace(/\\r\\n/g, '\\n'));
                                 }
                                 fileState.set(args.TargetFile, content);
                             }
                         }
                    }
                }
            }
        } catch (e) {
            console.error("Parse error on line:", e);
        }
    }

    // Now filter out the minimalist theme versions by identifying them and keeping only cyberpunk versions.
    // To do this reliably, we'll write ALL files, but since we want the CYBERPUNK version, we'll manually check the fileState history?
    // Actually, it's easier to just stop processing the transcript BEFORE the minimalist redesign started.
    // The minimalist redesign was requested at "2026-07-11T20:04:50+05:30" (User request).
    // Let's modify the loop to stop when we hit that user request.
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'); // $& means the whole matched string
}

async function run() {
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let stopProcessing = false;

    for await (const line of rl) {
        if (stopProcessing) break;
        if (!line.trim()) continue;
        try {
            const step = JSON.parse(line);
            
            // Stop processing if we see the user request for the minimalistic theme
            if (step.type === 'USER_INPUT' && typeof step.content === 'string' && step.content.includes('I NEED MINIMALISTIC THEME')) {
                console.log("Found minimalist theme request, stopping transcript parsing to preserve cyberpunk state.");
                stopProcessing = true;
                break;
            }

            if (step.type === 'PLANNER_RESPONSE' && step.tool_calls) {
                for (const call of step.tool_calls) {
                    if (call.name === 'write_to_file' || call.name === 'default_api:write_to_file') {
                        const args = call.args;
                        if (args && args.TargetFile && args.CodeContent) {
                            // Normalize path to use forward slashes for matching
                            const normalizedPath = args.TargetFile.split('\\').join('/');
                            fileState.set(normalizedPath, args.CodeContent);
                        }
                    } else if (call.name === 'replace_file_content' || call.name === 'default_api:replace_file_content') {
                        const args = call.args;
                        if (args && args.TargetFile) {
                            const normalizedPath = args.TargetFile.split('\\').join('/');
                            let content = fileState.get(normalizedPath);
                            if (content && args.TargetContent && args.ReplacementContent) {
                                // Strict exact match replacement
                                content = content.replace(args.TargetContent, args.ReplacementContent);
                                fileState.set(normalizedPath, content);
                            }
                        }
                    } else if (call.name === 'multi_replace_file_content' || call.name === 'default_api:multi_replace_file_content') {
                         const args = call.args;
                         if (args && args.TargetFile && args.ReplacementChunks) {
                             const normalizedPath = args.TargetFile.split('\\').join('/');
                             let content = fileState.get(normalizedPath);
                             if (content) {
                                 for (const chunk of args.ReplacementChunks) {
                                     content = content.replace(chunk.TargetContent, chunk.ReplacementContent);
                                 }
                                 fileState.set(normalizedPath, content);
                             }
                         }
                    }
                }
            }
        } catch (e) {
            console.error("Parse error");
        }
    }

    // Now we write out the recovered files
    const filesToRecover = [
        'src/components/sections/LoadingScreen.tsx',
        'src/components/sections/Terminal.tsx',
        'src/components/sections/SkillsGalaxy.tsx',
        'src/components/sections/AIAssistant.tsx',
        'src/components/sections/ProjectUniverse.tsx',
        'src/components/layout/SectionNavigator.tsx',
        'src/components/layout/AmbientControls.tsx',
        'src/components/layout/SmoothScrolling.tsx',
        'src/app/globals.css',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/components/sections/Hero.tsx',
        'src/components/sections/About.tsx',
        'src/components/sections/Contact.tsx',
        'src/components/sections/Footer.tsx',
        'src/components/layout/GSAPProvider.tsx'
    ];

    console.log("Files found in transcript state:");
    for (const key of fileState.keys()) {
        console.log(" -", key);
    }

    for (const [filepath, content] of fileState.entries()) {
        const relativePathMatch = filepath.match(/src\/.*/);
        if (!relativePathMatch) continue;
        
        const relativePath = relativePathMatch[0];
        
        if (filesToRecover.includes(relativePath)) {
            const absolutePath = path.join(workspacePath, relativePath);
            fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
            fs.writeFileSync(absolutePath, content);
            console.log("Recovered:", relativePath);
        }
    }
}

run();
