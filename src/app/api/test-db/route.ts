import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Missing Supabase environment variables' },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Query the scripture_mappings table
    // This table should be accessible without authentication
    const { data, error } = await supabase
      .from('scripture_mappings')
      .select('*')
      .limit(5);
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    // Return the data (will be empty if no records exist)
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase!',
      data: data || [],
      tableCount: (data || []).length
    });
    
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
}
