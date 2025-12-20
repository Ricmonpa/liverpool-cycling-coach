// Cloudflare Workers Function para proxy seguro de Gemini API
// Este archivo debe estar en: /functions/api/gemini.js

export async function onRequestPost(context) {
    const { request, env } = context;
    
    // Obtener API Key de Variables Secretas
    const GEMINI_API_KEY = env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
        return new Response(
            JSON.stringify({ 
                error: 'GEMINI_API_KEY no está configurada en Variables Secretas' 
            }),
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
    
    try {
        // Obtener el body de la solicitud
        const requestBody = await request.json();
        
        // Construir URL de Gemini API
        const GEMINI_MODEL = 'gemini-2.5-flash';
        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
        
        // Hacer la solicitud a Gemini API
        const geminiResponse = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        // Verificar si la respuesta es exitosa
        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            return new Response(
                JSON.stringify({ 
                    error: 'Error en Gemini API',
                    details: errorText 
                }),
                { 
                    status: geminiResponse.status,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // Retornar la respuesta de Gemini
        const geminiData = await geminiResponse.json();
        return new Response(
            JSON.stringify(geminiData),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            }
        );
        
    } catch (error) {
        return new Response(
            JSON.stringify({ 
                error: 'Error interno del servidor',
                message: error.message 
            }),
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Manejar OPTIONS para CORS
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

