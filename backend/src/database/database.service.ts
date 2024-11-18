import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private readonly sql: ReturnType<typeof neon>

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in the configuration');
    }
    
    this.sql = neon(databaseUrl);
  }

  async getData() {
    try {
      const data = await this.sql`SELECT * FROM your_table`;
      return data;
    } catch (error) {
      // Proper error handling
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
